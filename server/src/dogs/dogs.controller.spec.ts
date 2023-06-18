import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { MockProvider } from 'src/@types';

describe('DogsController', () => {
  let controller: DogsController;
  let dogsService: MockProvider<DogsService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
    }).useMocker(token => {
       if(token === DogsService){
          return {}
        } 
      }).compile();

    controller = module.get<DogsController>(DogsController);
    dogsService = module.get(DogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
