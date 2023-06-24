import { Injectable } from '@nestjs/common';
import { Adoption } from '../@types';
import { AdoptDogDto } from '../dtos/adopt-dog.dto';
import { AdoptionRepository } from './adoption.repository';
import { AdoptionStatus, AdoptionType } from '../entities/abstract.adoption';
import { DogsService } from '../dogs/dogs.service';
import { DogStatus } from '../entities/dog.entity';

@Injectable()
export class AdoptionService {
    constructor(
        private readonly adoptionRepository: AdoptionRepository,
        private readonly dogService: DogsService
    ) { }

    async createAdoption(dto: AdoptDogDto): Promise<Adoption> {
        return this.adoptionRepository.createAdoption(dto)
    }

    async processAdoption(id: number, status: AdoptionStatus) {
        const adoption = await this.adoptionRepository.get(id)

        if (adoption.type === AdoptionType.STANDARD) {
            this.processStandardAdoption(adoption, status);
        }

        if(adoption.type === AdoptionType.TEMPORARY) {
            this.processTemporaryAdoption(adoption, status);
        }
    }

    async getPendingAdoptions(){
        return this.adoptionRepository.getPendingAdoptions();
    }

    private processStandardAdoption(adoption: Adoption, status: AdoptionStatus) {
        if (status === AdoptionStatus.APPROVED) {
            this.adoptionRepository.update(adoption.id, { status });

            this.dogService.update(adoption.dog.id, { status: DogStatus.ADOPTED });

            this.adoptionRepository.deleteTemporaryAdoptions(adoption.dog.id)

            this.adoptionRepository.deleteVirtualAdoptions(adoption.dog.id)
        }

        if (status === AdoptionStatus.REJECTED) {
            this.adoptionRepository.delete(adoption.id);
        }
    }

    private processTemporaryAdoption(adoption: Adoption, status: AdoptionStatus) {
        this.adoptionRepository.update(adoption.id, { status });
    }
}
