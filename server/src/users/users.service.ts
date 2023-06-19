import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<
      UserEntity
    >,
  ) {}

  /**
   * Adds new user to the database, returns user entity
   */
  async create(dto: CreateUserDto) {
    const user = this.userRepository.create({
      username: dto.username,
      password: dto.password,
    });

    return this.userRepository.save(user);
  }

  /**
  * Returns single user entity based on given search options. Throws NotFoundException if user is not NotFoundException
  */
  async findOne(options: FindOneOptions<UserEntity>) {
    const user = await this.userRepository.findOne(options)
    
    if(!user) throw new NotFoundException('User not found')
    
    return user;
  }
}
