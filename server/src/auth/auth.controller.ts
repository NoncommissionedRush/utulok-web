import { Body, ClassSerializerInterceptor, Controller, Post, Session, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/dtos/create-user.dto";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body() dto: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.register(dto.username, dto.password);
    session.userId = user.id;
    return user;
  }

  @Post("/login")
  async login(
    @Body() dto: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.login(dto.username, dto.password);
    session.userId = user.id;
    return user;
  }
}
