import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionRepository } from './adoption.repository';

describe('Adoption', () => {
  let provider: AdoptionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoptionRepository],
    }).compile();

    provider = module.get<AdoptionRepository>(AdoptionRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
