import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UserEntity } from "src/entities/user.entity";
import { CreateUserDto } from "src/dtos/create-user.dto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOne({where: {username}});
    
    if (user) {
      throw new BadRequestException("User already exists");
    }
    
    const passwordString = await this.hashPassword(password);

    const dto: CreateUserDto = {
      username,
      password: passwordString
    }
    
    return this.usersService.create(dto);
  }

  async login(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOne({where: {username}});
    
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordIsValid = await this.checkPassword(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
    const passwordString = salt + "." + hashedPassword.toString("hex");
    return passwordString;
  }

  async checkPassword(
    password: string,
    passwordString: string,
  ): Promise<boolean> {
    const [salt, hashedPassword] = passwordString.split(".");
    const hashedAttempt = (await scrypt(password, salt, 32)) as Buffer;
    return hashedAttempt.toString("hex") === hashedPassword;
  }
}
