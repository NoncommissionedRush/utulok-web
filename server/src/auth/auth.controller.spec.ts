import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MockProvider } from "../../../types";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: MockProvider<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).useMocker((token) => {
      if (token === AuthService) {
        return {};
      }
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
