import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DogEntity } from "src/entities/dog.entity";
import { Repository } from "typeorm";
import { CreateDogDto } from "../dtos/create-dog.dto";
import { DogsFilter } from "src/dtos/dogs-filter.dto";

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
   * Returns all dog entities that match the given filter
   */
  async get(dto: DogsFilter) {
    const qb = this.dogRepository.createQueryBuilder("dog");

    if (dto.age) {
      qb.andWhere("dog.age = :age", { age: dto.age });
    }

    if (dto.sex) {
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

    return qb.getMany();
  }

  /**
   * returns single dog entity based on given id
   */
  async getById(id: number) {
    return this.dogRepository.findOne({ where: { id } });
  }
}
