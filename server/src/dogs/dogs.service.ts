import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DogEntity, Status } from "src/entities/dog.entity";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { CreateDogDto } from "../dtos/create-dog.dto";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { UpdateDogDto } from "src/dtos/update-dog.dto";
import { AdminDogsFilter, StatusFilter } from "src/dtos/adming-dogs-filter.dto";

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
  async getAvailable(dto: DogsFilter) {
    const qb = this.getDogsQuery(dto);

    qb.andWhere("dog.status = :status", { status: Status.AVAILABLE });

    return qb.getMany();
  }

  /**
   * Returns all dog entities that match the given filter.
   */
  async get(dto: AdminDogsFilter) {
    const qb = this.getDogsQuery(dto);

    if (dto.status && dto.status !== StatusFilter.ALL) {
      qb.andWhere("dog.status = :status", { status: dto.status });
    }
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

    return qb;
  }

  /**
   * Returns single dog entity based on given id. Throws NotFoundException if dog is not found
   */
  async getById(id: number, session?: Record<string, any>) {
    const options: FindOneOptions<DogEntity> = {
      where: { id }
    }

    if(!session.userId){
      (options.where as FindOptionsWhere<DogEntity>).status = Status.AVAILABLE
    }
    
    const dog = await this.dogRepository.findOne(options);

    if (!dog) throw new NotFoundException(`Dog ${id} not found`);

    return dog;
  }

  /**
   * Updates dog entity according to given data. Throws NotFoundException if dog is not found
   */
  async update(id: number, dto: UpdateDogDto) {
    const dog = await this.getById(id);

    return this.dogRepository.save({ ...dog, ...dto });
  }
}
