import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { MockProvider } from "../../../types";

describe("AuthService", () => {
  let service: AuthService;
  let userService: MockProvider<UsersService>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).useMocker((token) => {
      if (token === UsersService) {
        return {};
      }
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UsersService)
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
