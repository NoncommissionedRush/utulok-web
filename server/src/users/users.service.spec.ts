import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { MockProvider } from 'src/@types';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockProvider<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).useMocker(token => {
        if(token === getRepositoryToken(UserEntity)){
          return {}
        }
      }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(UserEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
