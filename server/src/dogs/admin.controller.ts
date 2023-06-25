import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdoptionService } from '../adoption/adoption.service';
import { AdminDogsFilter } from '../dtos/adming-dogs-filter.dto';
import { CreateDogDto } from '../dtos/create-dog.dto';
import { UpdateDogDto } from '../dtos/update-dog.dto';
import { AdoptionStatus } from '../entities/abstract.adoption';
import { AuthGuard } from '../guards/auth.guard';
import { DogsService } from './dogs.service';

@UseGuards(AuthGuard)
@Controller('admin')
export class AdminController {
constructor(
    private readonly dogsService: DogsService,
    private readonly adoptionService: AdoptionService
  ) {}

  @Post("/dog")
  async createDog(@Body() dto: CreateDogDto) {
    return this.dogsService.create(dto);
  }

  //TODO: fix validation on incoming query
  @Post("process-adoption")
  async processAdoption(@Query("id") id: number, @Query("status") status: AdoptionStatus) {
    //TODO: send email to adopter
    this.adoptionService.processAdoption(id, status);
  }

  @Get("/pending-adoptions")
  async getPendingAdoptions() {
    return this.adoptionService.getPendingAdoptions();
  }

  @Get("/dogs")
  async getDogsAdmin(@Query() query: AdminDogsFilter) {
    return this.dogsService.getMany(query);
  }

  @Get("/dog/:id")
  async getDog(@Param("id") id: number) {
    return this.dogsService.getById(id);
  }

  @Put("/dog/:id")
  async update(@Param("id") id: number, @Body() query: UpdateDogDto) {
    return this.dogsService.update(id, query);
  }
}
