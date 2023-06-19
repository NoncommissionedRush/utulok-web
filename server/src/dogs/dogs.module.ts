import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogEntity } from 'src/entities/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  providers: [DogsService],
  controllers: [DogsController]
})
export class DogsModule {}
