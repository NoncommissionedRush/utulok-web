import { Test, TestingModule } from "@nestjs/testing";
import { DogsService } from "./dogs.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DogEntity } from "src/entities/dog.entity";
import { Repository } from "typeorm";
import { CreateDogDto } from "src/dtos/create-dog.dto";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateDogDto } from "src/dtos/update-dog.dto";
import { AdminDogsFilter, StatusFilter } from "src/dtos/adming-dogs-filter.dto";
import { MockProvider, Size, Sex, Age, DogStatus } from "../../../types";

describe("DogsService", () => {
  let service: DogsService;
  let dogRepository: MockProvider<Repository<DogEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsService],
    }).useMocker((token) => {
      if (token === getRepositoryToken(DogEntity)) {
        return {
          create: jest.fn(),
          save: jest.fn(),
          createQueryBuilder: jest.fn().mockReturnValue({
            getMany: jest.fn(),
          }),
          findOne: jest.fn(),
        };
      }
    }).compile();

    service = module.get<DogsService>(DogsService);
    dogRepository = module.get(getRepositoryToken(DogEntity));

    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    const dto: CreateDogDto = {
      name: "dog name",
      size: Size.MEDIUM,
      sex: Sex.MALE,
      age: Age.PUPPY,
      color: "black",
      isKidFriendly: true,
      isVaccinated: true,
      isCastrated: true,
    } as CreateDogDto;

    it("calls create on dog repository", async () => {
      await service.create(dto);

      expect(dogRepository.create).toHaveBeenCalledWith(dto);
    });

    it("calls save on dog repository", async () => {
      const newEntity = {} as DogEntity;
      dogRepository.create.mockReturnValue(newEntity);
      await service.create(dto);
      expect(dogRepository.save).toHaveBeenCalledWith(newEntity);
    });
  });

  describe("getAvailable", () => {
    const qb = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    };

    beforeEach(() => {
      dogRepository.createQueryBuilder.mockReturnValue(qb);
    });

    it("creates query builder", async () => {
      const dto: DogsFilter = {};
      await service.getManyAvailable(dto);
      expect(dogRepository.createQueryBuilder).toHaveBeenCalledWith("dog");
    });

    it("calls getMany on query builder", async () => {
      const dto: DogsFilter = {};
      await service.getManyAvailable(dto);
      expect(qb.getMany).toHaveBeenCalled();
    });

    it("adds Status.AVAILABLE to query", async () => {
      const dto: DogsFilter = {};
      await service.getManyAvailable(dto);
      expect(qb.andWhere).toHaveBeenCalledWith(
        expect.stringContaining("dog.status"),
        { status: DogStatus.AVAILABLE },
      );
    });

    describe("if dto contains age", () => {
      beforeEach(async () => {
        const dto: DogsFilter = {
          age: Age.PUPPY,
        };

        await service.getManyAvailable(dto);
      });

      it("adds age condition to query", () => {
        expect(qb.andWhere).toHaveBeenCalledWith(
          expect.stringContaining("dog.age"),
          expect.any(Object),
        );
      });
    });

    describe("if dto contains sex", () => {
      beforeEach(async () => {
        const dto: DogsFilter = {
          sex: Sex.MALE,
        };

        await service.getManyAvailable(dto);
      });

      it("adds sex condition to query", () => {
        expect(qb.andWhere).toHaveBeenCalledWith(
          expect.stringContaining("dog.sex"),
          expect.any(Object),
        );
      });
    });

    describe("if dto contains size", () => {
      beforeEach(async () => {
        const dto: DogsFilter = {
          size: Size.SMALL,
        };

        await service.getManyAvailable(dto);
      });

      it("adds size condition to query", () => {
        expect(qb.andWhere).toHaveBeenCalledWith(
          expect.stringContaining("dog.size"),
          expect.any(Object),
        );
      });
    });

    describe("if dto contains isCastrated", () => {
      beforeEach(async () => {
        const dto: DogsFilter = {
          isCastrated: true,
        };

        await service.getManyAvailable(dto);
      });

      it("adds isCastrated condition to query", () => {
        expect(qb.andWhere).toHaveBeenCalledWith(
          expect.stringContaining("dog.isCastrated"),
          expect.any(Object),
        );
      });
    });

    describe("if dto contains isVaccinated", () => {
      beforeEach(async () => {
        const dto: DogsFilter = {
          isVaccinated: true,
        };

        await service.getManyAvailable(dto);
      });

      it("adds isVaccinated condition to query", () => {
        expect(qb.andWhere).toHaveBeenCalledWith(
          expect.stringContaining("dog.isVaccinated"),
          expect.any(Object),
        );
      });
    });

    describe("if dto contains isKidFriendly", () => {
      beforeEach(async () => {
        const dto: DogsFilter = {
          isKidFriendly: true,
        };

        await service.getManyAvailable(dto);
      });

      it("adds isKidFriendly condition to query", () => {
        expect(qb.andWhere).toHaveBeenCalledWith(
          expect.stringContaining("dog.isKidFriendly"),
          expect.any(Object),
        );
      });
    });
  });

  describe("get", () => {
    const qb = {
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    };

    let dto: AdminDogsFilter;

    beforeEach(() => {
      dogRepository.createQueryBuilder.mockReturnValue(qb);
    });

    it("creates new query builder", async () => {
      dto = {
        status: StatusFilter.AVAILABLE,
      };

      await service.getMany(dto);

      expect(dogRepository.createQueryBuilder).toHaveBeenCalled();
    });

    describe("if dto contains status", () => {
      describe("if status is 'ALL'", () => {
        it("does not add status to query", async () => {
          dto = {
            status: StatusFilter.ALL,
          };

          await service.getMany(dto);

          expect(qb.andWhere).not.toHaveBeenCalled();
        });
      });

      describe("if status is not 'ALL'", () => {
        it("adds status to query", async () => {
          dto = {
            status: StatusFilter.AVAILABLE,
          };

          await service.getMany(dto);

          expect(qb.andWhere).toHaveBeenCalledWith(
            expect.stringContaining("dog.status"),
            { status: dto.status },
          );
        });
      });
    });

    describe("dto does not contain status", () => {
      it("does not add status to query", async () => {
        dto = {};

        await service.getMany(dto);

        expect(qb.andWhere).not.toHaveBeenCalled();
      });
    });
  });

  describe("getById", () => {
    const id = 1;

    describe("if user is not logged in", () => {
      it("calls findOne with id and status = AVAILABLE", async () => {
        dogRepository.findOne.mockResolvedValue({} as DogEntity);

        await service.getAvailableById(id);

        expect(dogRepository.findOne).toHaveBeenCalledWith({
          where: { id, status: DogStatus.AVAILABLE },
        });
      });
    });

    describe("if user is logged in", () => {
      it("calls findOne on dog repository with id", async () => {
        const session: Record<string, any> = { userId: 'user_id'}
        
        dogRepository.findOne.mockResolvedValueOnce({} as DogEntity);

        await service.getAvailableById(id);

        expect(dogRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      });
    });

    it("throws NotFoundException if dog is not found", async () => {
      dogRepository.findOne.mockResolvedValueOnce(undefined);

      await expect(service.getAvailableById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    const id = 1;
    const dto: UpdateDogDto = {
      name: "updated name",
    };
    const dog = {
      name: "old name",
    } as DogEntity;
    let spy: any;

    beforeEach(async () => {
      spy = jest.spyOn(service, "getById").mockResolvedValueOnce(dog);
      await service.update(id, dto);
    });

    it("calls own method getById", async () => {
      expect(spy).toHaveBeenCalledWith(id);
    });

    it("calls save with updated entity", async () => {
      const updatedDog = dogRepository.save.mock.calls[0][0];
      expect(dogRepository.save).toHaveBeenCalled();
      expect(updatedDog.name).toBe(dto.name);
    });
  });
});
