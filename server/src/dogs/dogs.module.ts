import { Module, forwardRef } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogEntity } from 'src/entities/dog.entity';
import { AdoptionModule } from '../adoption/adoption.module';
import { AdminController } from './admin.controller';
import { MailingModule } from '../mailing/mailing.module';

@Module({
  imports: [
    forwardRef(() => AdoptionModule), 
    TypeOrmModule.forFeature([DogEntity]),
    MailingModule
  ],
  providers: [DogsService],
  controllers: [DogsController, AdminController],
  exports: [DogsService]
})
export class DogsModule {}
