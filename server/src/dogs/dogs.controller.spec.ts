import { Test, TestingModule } from "@nestjs/testing";
import { DogsController } from "./dogs.controller";
import { DogsService } from "./dogs.service";
import { MockProvider } from "src/@types";
import { CreateDogDto } from "src/dtos/create-dog.dto";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { UpdateDogDto } from "src/dtos/update-dog.dto";
import { AdminDogsFilter } from "src/dtos/adming-dogs-filter.dto";

describe("DogsController", () => {
  let controller: DogsController;
  let dogsService: MockProvider<DogsService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
    }).useMocker((token) => {
      if (token === DogsService) {
        return {
          create: jest.fn(),
          get: jest.fn(),
          getAvailable: jest.fn(),
          getById: jest.fn(),
          update: jest.fn(),
        };
      }
    }).compile();

    controller = module.get<DogsController>(DogsController);
    dogsService = module.get(DogsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("createDog", () => {
    const dto = {} as CreateDogDto;

    it("calls create on dogsService", async () => {
      await controller.createDog(dto);

      expect(dogsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("getAvailableDogs", () => {
    const query = {} as DogsFilter;

    it("calls getAvailable on dogsService", async () => {
      await controller.getAvailableDogs(query);

      expect(dogsService.getAvailable).toHaveBeenCalledWith(query);
    });
  });

  describe("getDogsAdmin", () => {
    const query = {} as AdminDogsFilter

    it("calls get on dogsService", async () => {
      await controller.getDogsAdmin(query)
      expect(dogsService.get).toHaveBeenCalledWith(query)
    })
  })

  describe("getDog", () => {
    const id = 1;

    it("calls getById on dogsService", async () => {
      await controller.getDog(id);

      expect(dogsService.getById).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    const id = 1;
    const dto = {} as UpdateDogDto;

    it("calls update on dogsService", async () => {
      await controller.update(id, dto);

      expect(dogsService.update).toHaveBeenCalledWith(id, dto);
    });
  });
});
