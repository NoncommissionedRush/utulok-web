import { Module, forwardRef } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogEntity } from 'src/entities/dog.entity';
import { AdoptionModule } from '../adoption/adoption.module';

@Module({
  imports: [forwardRef(() => AdoptionModule), TypeOrmModule.forFeature([DogEntity])],
  providers: [DogsService],
  controllers: [DogsController],
  exports: [DogsService]
})
export class DogsModule {}
