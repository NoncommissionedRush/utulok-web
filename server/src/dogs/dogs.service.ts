import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminDogsFilter, StatusFilter } from "src/dtos/adming-dogs-filter.dto";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { UpdateDogDto } from "src/dtos/update-dog.dto";
import { DogEntity, DogStatus } from "src/entities/dog.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateDogDto } from "../dtos/create-dog.dto";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Events } from "../events";
import { Adoption } from "../@types";

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogEntity) private readonly dogRepository: Repository<
      DogEntity
    >,
    private eventEmitter: EventEmitter2
  ) { }

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

    qb.leftJoinAndSelect("dog.adoption", "adoption");
    qb.leftJoinAndSelect('dog.virtualAdoptions', 'virtualAdoptions')
    qb.leftJoinAndSelect('dog.temporaryAdoption', 'temporaryAdoption')

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
   * Returns single dog entity with status = 'available' based on given id. 
   * 
   * Throws NotFoundException if dog is not found
   */
  async getAvailableById(id: number) {
    const options: FindOneOptions<DogEntity> = {
      where: { id, status: DogStatus.AVAILABLE },
    };

    const dog = await this.dogRepository.findOne(options);

    if (!dog) throw new NotFoundException('Dog not found');

    return dog;
  }

  /**
   * Returns single dog entity based on given id. Only admins can get unavailable dogs. If dog is not found, throws NotFoundException
   */
  async getById(id: number) {
    const options: FindOneOptions<DogEntity> = {
      where: { id },
      relations: {
        adoption: true,
        virtualAdoptions: true,
        temporaryAdoption: true
      }
    };

    const dog = await this.dogRepository.findOne(options);

    if (!dog) throw new NotFoundException('Dog not found');

    return dog;
  }

  /**
   * Updates given dog entity according to the given dto and returns updated dog entity
   */
  async update(dog: DogEntity, dto: Partial<DogEntity>): Promise<DogEntity>

  /**
   * Looks for dog entity with given id, updates it according to the given dto and returns updated dog entity.
   */
  async update(id: number, dto: UpdateDogDto): Promise<DogEntity>

  async update(idOrDog: number | DogEntity, dto: UpdateDogDto) {
    let dogEntity: DogEntity;

    if (typeof idOrDog === 'number') {
      dogEntity = await this.getById(idOrDog);
    } else {
      dogEntity = idOrDog;
    }

    if (dto.status && dto.status === DogStatus.DECEASED) {
      await this.eventEmitter.emitAsync(Events.DOG_DECEASED, dogEntity)
    }

    return this.dogRepository.save({ ...dogEntity, ...dto });
  }

  @OnEvent(Events.ADOPTION_STANDARD_APPROVED)
  async handleStandardAdoptionApproved(adoption: Adoption) {
    await this.dogRepository.save({...adoption.dog, status: DogStatus.ADOPTED})
  }

}
