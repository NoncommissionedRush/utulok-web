import { BadRequestException, Injectable } from '@nestjs/common';
import { Adoption } from '../@types';
import { AdoptDogDto } from '../dtos/adopt-dog.dto';
import { AdoptionRepository } from './adoption.repository';
import { AdoptionStatus, AdoptionType } from '../entities/abstract.adoption';
import { DogsService } from '../dogs/dogs.service';
import { EligibleFor } from '../entities/dog.entity';
import { ProcessAdoptionDto } from '../dtos/process-adoption.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from '../events';

@Injectable()
export class AdoptionService {
    constructor(
        private readonly adoptionRepository: AdoptionRepository,
        private readonly dogService: DogsService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async createAdoption(dto: AdoptDogDto): Promise<Adoption> {
        const dog = await this.dogService.getAvailableById(dto.dogId);

        if (dog.eligibleFor === EligibleFor.VIRTUAL_ONLY && dto.type !== AdoptionType.VIRTUAL) {
            throw new BadRequestException('This dog is only eligible for virtual adoption');
        }

        return this.adoptionRepository.createAdoption(dto, dog)
    }

    async processAdoption(dto: ProcessAdoptionDto) {
        const adoption = await this.adoptionRepository.findOneBy({ id: dto.id, type: dto.type })

        if (adoption.type === AdoptionType.STANDARD) {
            this.processStandardAdoption(adoption, dto.status);
        }

        if (adoption.type === AdoptionType.TEMPORARY) {
            this.processTemporaryAdoption(adoption, dto.status);
        }
    }

    async getPendingAdoptions() {
        return this.adoptionRepository.getPendingAdoptions();
    }

    private processStandardAdoption(adoption: Adoption, status: AdoptionStatus) {
        if (status === AdoptionStatus.APPROVED) {
            this.eventEmitter.emit(Events.ADOPTION_STANDARD_APPROVED, adoption)
        }

        if (status === AdoptionStatus.REJECTED) {
            this.adoptionRepository.remove(adoption)
        }
    }

    private processTemporaryAdoption(adoption: Adoption, status: AdoptionStatus) {
        this.adoptionRepository.setAdoptionStatus(adoption, status)
    }
}
