import { BadRequestException, Injectable } from '@nestjs/common';
import { StandardAdoption } from '../entities/standard-adoption.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, Repository } from 'typeorm';
import { VirtualAdoption } from '../entities/virtual-adoption.entity';
import { TemporaryAdoption } from '../entities/temporary-adoption.entity';
import { AdoptDogDto } from '../dtos/adopt-dog.dto';
import { Adoption } from '../@types';
import { AdoptionStatus, AdoptionType } from '../entities/abstract.adoption';
import { DogEntity } from '../entities/dog.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events';

@Injectable()
export class AdoptionRepository {
    constructor(
        @InjectRepository(StandardAdoption)
        private readonly standardAdoptionRepository: Repository<StandardAdoption>,
        @InjectRepository(VirtualAdoption)
        private readonly virtualAdoptionRepository: Repository<VirtualAdoption>,
        @InjectRepository(TemporaryAdoption)
        private readonly temporaryAdoptionRepository: Repository<TemporaryAdoption>,
    ) { }

    async createAdoption(dto: AdoptDogDto, dog?: DogEntity): Promise<Adoption> {
        const repository = this.getRepository(dto.type);

        const newAdoption = repository.create({
            type: dto.type,
            adopterEmail: dto.email,
            adopterPhone: dto.phone,
        })

        if (dto.type === AdoptionType.VIRTUAL) {
            newAdoption.status = AdoptionStatus.APPROVED;
        }

        newAdoption.dog = dog;

        return repository.save(newAdoption);
    }

    async findOneBy(options: FindOptionsWhere<Adoption>): Promise<Adoption> {
        const repository = this.getRepository(options.type);

        return repository.findOne({ where: options})
    }

    private getRepository(type: AdoptionType | FindOperator<AdoptionType>) {
        let repository: Repository<Adoption>;

        switch (type) {
            case AdoptionType.STANDARD:
                repository = this.standardAdoptionRepository;
                break;
            case AdoptionType.VIRTUAL:
                repository = this.virtualAdoptionRepository;
                break;
            case AdoptionType.TEMPORARY:
                repository = this.temporaryAdoptionRepository;
                break;
            default:
                throw new BadRequestException('Invalid adoption type');
        }
        return repository;
    }

    async getPendingAdoptions(): Promise<Adoption[]> {
        const standardAdoptions = await this.standardAdoptionRepository.find({ where: { status: AdoptionStatus.PENDING } });
        const temporaryAdoptions = await this.temporaryAdoptionRepository.find({ where: { status: AdoptionStatus.PENDING } });

        return [...standardAdoptions, ...temporaryAdoptions]
    }

    async setAdoptionStatus(adoption: Adoption, status: AdoptionStatus) {
        const repository = this.getRepository(adoption.type);

        return repository.save({ ...adoption, status })
    }

    async remove(adoption: Adoption) {
        const repository = this.getRepository(adoption.type);

        return repository.remove(adoption);
    }

    @OnEvent(Events.ADOPTION_STANDARD_APPROVED)
    async onStandardAdoptionApproved(adoption: StandardAdoption) {
        this.setAdoptionStatus(adoption, AdoptionStatus.APPROVED);

        this.deleteTemporaryAdoptions(adoption.dog.id);

        this.deleteVirtualAdoptions(adoption.dog.id);
    }

    private async deleteTemporaryAdoptions(dogId: number) {
        this.temporaryAdoptionRepository.delete({ dog: { id: dogId } });
    }

    private async deleteVirtualAdoptions(dogId: number) {
        this.virtualAdoptionRepository.delete({ dog: { id: dogId } });
    }
}
