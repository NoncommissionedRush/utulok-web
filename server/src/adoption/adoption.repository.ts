import { BadRequestException, Injectable } from '@nestjs/common';
import { StandardAdoption } from '../entities/standard-adoption.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualAdoption } from '../entities/virtual-adoption.entity';
import { TemporaryAdoption } from '../entities/temporary-adoption.entity';
import { AdoptDogDto } from '../dtos/adopt-dog.dto';
import { Adoption } from '../@types';
import { AdoptionStatus, AdoptionType } from '../entities/abstract.adoption';
import { DogEntity } from '../entities/dog.entity';

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
        let repository: Repository<any>;

        switch (dto.type) {
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

        const newAdoption = repository.create({
            type: dto.type,
            adopterEmail: dto.email,
            adopterPhone: dto.phone,
        })

        if(dto.type === AdoptionType.VIRTUAL) {
            newAdoption.status = AdoptionStatus.APPROVED;
        }

        newAdoption.dog = dog;

        return repository.save(newAdoption);
    }

    async getStandardAdoption(id: number): Promise<StandardAdoption> {
        const adoption = await this.standardAdoptionRepository.findOne({ where: { id } });
        if (!adoption) throw new NotFoundException('Adoption not found');
        return adoption
    }

    async getVirtualAdoption(id: number): Promise<VirtualAdoption> {
        const adoption = await this.virtualAdoptionRepository.findOne({ where: { id } });
        if (!adoption) throw new NotFoundException('Adoption not found');
        return adoption
    }

    async getTemporaryAdoption(id: number): Promise<TemporaryAdoption> {
        const adoption = await this.temporaryAdoptionRepository.findOne({ where: { id } });
        if (!adoption) throw new NotFoundException('Adoption not found');
        return adoption
    }

    async get(id: number): Promise<Adoption> {
        const standardAdoption = await this.getStandardAdoption(id)
        if (standardAdoption) return standardAdoption;

        const virtualAdoption = await this.getVirtualAdoption(id)
        if (virtualAdoption) return virtualAdoption;

        const temporaryAdoption = await this.getTemporaryAdoption(id)
        if (temporaryAdoption) return temporaryAdoption;
    }

    async update(id: number, data: Partial<Adoption>): Promise<Adoption> {
        const adoption = await this.get(id);

        return this.standardAdoptionRepository.save({ ...adoption, ...data });
    }

    async delete(id: number): Promise<void> {
        await this.standardAdoptionRepository.delete(id);
    }

    async deleteTemporaryAdoptions(dogId: number) {
        await this.temporaryAdoptionRepository.delete({ dog: { id: dogId } });
    }

    async deleteVirtualAdoptions(dogId: number) {
        await this.virtualAdoptionRepository.delete({ dog: { id: dogId } });
    }

    async getPendingAdoptions(): Promise<Adoption[]> {
        const standardAdoptions = await this.standardAdoptionRepository.find({ where: { status: AdoptionStatus.PENDING } });
        const temporaryAdoptions = await this.temporaryAdoptionRepository.find({ where: { status: AdoptionStatus.PENDING } });

        return [...standardAdoptions, ...temporaryAdoptions]
    }
}
