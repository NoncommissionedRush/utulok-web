import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AdoptDogDto } from '../dtos/adopt-dog.dto';
import { AdoptionRepository } from './adoption.repository';
import { DogsService } from '../dogs/dogs.service';
import { DogEntity } from '../entities/dog.entity';
import { ProcessAdoptionDto } from '../dtos/process-adoption.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events';
import { Adoption, EligibleFor, AdoptionType, AdoptionApprovalStatus } from '../../../types';

@Injectable()
export class AdoptionService {
    constructor(
        private readonly adoptionRepository: AdoptionRepository,
        private readonly dogService: DogsService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    /**
     * Creates new adoption entity of the given type and saves it to database.
     * 
     * Throws BadRequestException if dog is not eligible for the given adoption type.
     */
    async createAdoption(dto: AdoptDogDto): Promise<Adoption> {
        const dog = await this.dogService.getAvailableById(dto.dogId);

        if (dog.eligibleFor === EligibleFor.VIRTUAL_ONLY && dto.type !== AdoptionType.VIRTUAL) {
            throw new BadRequestException('This dog is only eligible for virtual adoption');
        }

        await this.validateDuplicateAdoption(dto)

        return await this.adoptionRepository.createAdoption(dto, dog)
    }

    private async validateDuplicateAdoption(dto: AdoptDogDto): Promise<void> {
        const existing = await this.adoptionRepository.findOneBy({
            type: dto.type,
            adopterEmail: dto.email,
            dog: { id: dto.dogId },
        });

        if (existing) {
            throw new BadRequestException('Duplicate adoption entry');
        }
    }

    /**
     * Processes an adoption based on its type and status. 
     * 
     * Throws NotFoundException if adoption is not found.
     */
    async processAdoption(dto: ProcessAdoptionDto): Promise<Adoption> {
        const adoption = await this.adoptionRepository.findOneBy({ id: dto.id, type: dto.type })

        if (!adoption) throw new NotFoundException('Adoption not found');

        if (adoption.type === AdoptionType.STANDARD) {
            await this.processStandardAdoption(adoption, dto.status);
        }

        if (adoption.type === AdoptionType.TEMPORARY) {
            await this.processTemporaryAdoption(adoption, dto.status);
        }

        return adoption;
    }

    /**
     * Returns all adoptions with status 'pending'
     */
    async getPendingAdoptions(): Promise<Adoption[]> {
        return await this.adoptionRepository.getPendingAdoptions();
    }

    private async processStandardAdoption(adoption: Adoption, status: AdoptionApprovalStatus): Promise<void> {
        if (status === AdoptionApprovalStatus.APPROVED) {
            await this.eventEmitter.emitAsync(Events.ADOPTION_STANDARD_APPROVED, adoption)

            const setAdoptionStatus = this.adoptionRepository.setAdoptionStatus(adoption, status)

            const deleteVirtual = this.adoptionRepository.deleteVirtualAdoptions(adoption.dog.id)

            const deleteTemporary = this.adoptionRepository.deleteTemporaryAdoption(adoption.dog.id)

            await Promise.all([setAdoptionStatus, deleteVirtual, deleteTemporary])
        }

        if (status === AdoptionApprovalStatus.REJECTED) {
            await this.adoptionRepository.remove(adoption)
        }
    }

    private async processTemporaryAdoption(adoption: Adoption, status: AdoptionApprovalStatus) {
        await this.adoptionRepository.setAdoptionStatus(adoption, status)
    }

    @OnEvent(Events.DOG_DECEASED)
    async handleDogDeceased(dog: DogEntity) {
        const deleteVirtual = this.adoptionRepository.deleteVirtualAdoptions(dog.id)

        const deleteTemporary = this.adoptionRepository.deleteTemporaryAdoption(dog.id)

        return Promise.all([deleteVirtual, deleteTemporary])
    }
}
