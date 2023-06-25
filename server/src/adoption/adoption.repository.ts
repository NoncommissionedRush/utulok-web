import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { StandardAdoption } from '../entities/standard-adoption.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, Repository } from 'typeorm';
import { VirtualAdoption } from '../entities/virtual-adoption.entity';
import { TemporaryAdoption } from '../entities/temporary-adoption.entity';
import { AdoptDogDto } from '../dtos/adopt-dog.dto';
import { Adoption } from '../@types';
import { AdoptionApprovalStatus, AdoptionType } from '../entities/abstract.adoption';
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
        const repository = this.getRepository(dto.type);

        const newAdoption = repository.create({
            type: dto.type,
            adopterEmail: dto.email,
            adopterPhone: dto.phone,
        })

        if (dto.type === AdoptionType.VIRTUAL) {
            newAdoption.approvalStatus = AdoptionApprovalStatus.APPROVED;
        }

        newAdoption.dog = dog;

        return repository.save(newAdoption);
    }

    async findOneBy(options: FindOptionsWhere<Adoption>): Promise<Adoption> {
        const repository = this.getRepository(options.type);

        return repository.findOne({ where: options, relations: { dog: true } })
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
        const standardAdoptions = await this.standardAdoptionRepository.find({
            where: { approvalStatus: AdoptionApprovalStatus.PENDING },
            relations: {
                dog: true
            }
        });
        const temporaryAdoptions = await this.temporaryAdoptionRepository.find({
            where: { approvalStatus: AdoptionApprovalStatus.PENDING },
            relations: {
                dog: true
            }
        });

        return [...standardAdoptions, ...temporaryAdoptions]
    }

    async setAdoptionStatus(adoption: Adoption, status: AdoptionApprovalStatus) {
        const repository = this.getRepository(adoption.type);

        return repository.save({ ...adoption, approvalStatus: status })
    }

    async remove(adoption: Adoption) {
        const repository = this.getRepository(adoption.type);

        return repository.remove(adoption);
    }

    async deleteVirtualAdoptions(dogId: number) {
        return this.virtualAdoptionRepository.createQueryBuilder('adoption')
            .where('dogId = :id', { id: dogId })
            .delete()
            .execute()

    }

    async deleteTemporaryAdoption(dogId: number) {
        return this.temporaryAdoptionRepository.createQueryBuilder('adoption')
            .where('dogId = :id', { id: dogId })
            .delete()
            .execute()
    }
}
