import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionRepository } from './adoption.repository';
import { DogsModule } from '../dogs/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardAdoption } from '../entities/standard-adoption.entity';
import { VirtualAdoption } from '../entities/virtual-adoption.entity';
import { TemporaryAdoption } from '../entities/temporary-adoption.entity';

@Module({
  imports: [DogsModule, TypeOrmModule.forFeature([StandardAdoption, VirtualAdoption, TemporaryAdoption])],
  providers: [AdoptionService, AdoptionRepository],
  exports: [AdoptionService, ]
})
export class AdoptionModule {}
