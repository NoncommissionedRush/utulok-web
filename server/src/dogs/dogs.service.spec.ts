import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DogEntity } from 'src/entities/dog.entity';
import { MockProvider } from 'src/@types';
import { Repository } from 'typeorm';

describe('DogsService', () => {
  let service: DogsService;
  let dogRepository: MockProvider<Repository<DogEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsService],
    }).useMocker(token => {
        if(token === getRepositoryToken(DogEntity)){
          return {}
        }
      }).compile();

    service = module.get<DogsService>(DogsService);
    dogRepository = module.get(getRepositoryToken(DogEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
