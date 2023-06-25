import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminDogsFilter, StatusFilter } from "src/dtos/adming-dogs-filter.dto";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { UpdateDogDto } from "src/dtos/update-dog.dto";
import { DogEntity, DogStatus } from "src/entities/dog.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateDogDto } from "../dtos/create-dog.dto";
import { OnEvent } from "@nestjs/event-emitter";
import { Events } from "../events";
import { Adoption } from "../@types";

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogEntity) private readonly dogRepository: Repository<
      DogEntity
    >,
  ) {}

  /**
   * Adds new dog to the database, returns dog entity
   */
  async create(dto: CreateDogDto) {
    const dog = this.dogRepository.create(dto);

    return this.dogRepository.save(dog);
  }

  /**
   * Returns all dog entities with status = Status.AVAILABLE that match the given filter
   */
  async getManyAvailable(dto: DogsFilter) {
    const qb = this.getDogsQuery(dto);

    qb.andWhere("dog.status = :status", { status: DogStatus.AVAILABLE });

    return qb.getMany();
  }

  /**
   * Returns all dog entities that match the given filter. Only admins can get dogs with different status than 'available'
   */
  async getMany(dto: AdminDogsFilter) {
    const qb = this.getDogsQuery(dto);

    if (dto.status && dto.status !== StatusFilter.ALL) {
      qb.andWhere("dog.status = :status", { status: dto.status });
    }

    return qb.getMany();
  }

  private getDogsQuery(dto: DogsFilter) {
    const qb = this.dogRepository.createQueryBuilder("dog");

    if (dto.age) {
      qb.andWhere("dog.age = :age", { age: dto.age });
    }

    if (dto.sex !== undefined && dto.sex !== null) {
      qb.andWhere("dog.sex = :sex", { sex: dto.sex });
    }

    if (dto.size) {
      qb.andWhere("dog.size = :size", { size: dto.size });
    }

    if (dto.isCastrated) {
      qb.andWhere("dog.isCastrated = :isCastrated", {
        isCastrated: dto.isCastrated,
      });
    }

    if (dto.isVaccinated) {
      qb.andWhere("dog.isVaccinated = :isVaccinated", {
        isVaccinated: dto.isVaccinated,
      });
    }

    if (dto.isKidFriendly) {
      qb.andWhere("dog.isKidFriendly = :isKidFriendly", {
        isKidFriendly: dto.isKidFriendly,
      });
    }

    if (dto.eligibleFor) {
      qb.andWhere("dog.eligibleFor = :eligibleFor", {
        eligibleFor: dto.eligibleFor,
      });
    }

    return qb;
  }

  /**
   * Returns single dog entity with status = 'available' based on given id. If dog is not found, throws NotFoundException
   */
  async getAvailableById(id: number ) {
    const options: FindOneOptions<DogEntity> = {
      where: { id, status: DogStatus.AVAILABLE  },
    };

    const dog = await this.dogRepository.findOne(options);

    if(!dog) throw new NotFoundException('Dog not found');

    return dog;
  }

  /**
   * Returns single dog entity based on given id. Only admins can get unavailable dogs.
   */
  async getById(id: number) {
    const options: FindOneOptions<DogEntity> = {
      where: { id },
    };

    return this.dogRepository.findOne(options);
  }

  /**
   * Updates dog entity according to given data. Throws NotFoundException if dog is not found
   */
  async update(id: number, dto: UpdateDogDto) {
    const dog = await this.getAvailableById(id);

    if(!dog) throw new NotFoundException('Dog not found');

    return this.dogRepository.save({ ...dog, ...dto });
  }

  @OnEvent(Events.ADOPTION_STANDARD_APPROVED)
  async onAdoptionStandardApproved(adoption: Adoption) {
    this.dogRepository.save({...adoption.dog, status: DogStatus.ADOPTED})
  }
}
