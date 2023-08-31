import { Test, TestingModule } from "@nestjs/testing";
import { DogsController } from "./dogs.controller";
import { DogsService } from "./dogs.service";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { MockProvider } from "../../../types";

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

  describe("getAvailableDogs", () => {
    const query = {} as DogsFilter;

    it("calls getAvailable on dogsService", async () => {
      await controller.getAvailableDogs(query);

      expect(dogsService.getManyAvailable).toHaveBeenCalledWith(query);
    });
  });

  describe("getDog", () => {
    const id = 1;
    const session = {}

    it("calls getById on dogsService", async () => {
      await controller.getDog(id);

      expect(dogsService.getAvailableById).toHaveBeenCalledWith(id, session);
    });
  });
});
