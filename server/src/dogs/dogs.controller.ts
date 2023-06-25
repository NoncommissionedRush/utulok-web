import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors
} from "@nestjs/common";
import { AdoptDogDto } from "src/dtos/adopt-dog.dto";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { AdoptionService } from "../adoption/adoption.service";
import { DogsService } from "./dogs.service";

@Controller("dogs")
@UseInterceptors(ClassSerializerInterceptor)
export class DogsController {
  constructor(
    private readonly dogsService: DogsService,
    private readonly adoptionService: AdoptionService
  ) {}

  @Post("/adopt")
  async adopt(@Body() dto: AdoptDogDto) {
    //TODO: send email to admin
    return this.adoptionService.createAdoption(dto);
  }

  @Get("/")
  async getAvailableDogs(@Query() query: DogsFilter) {
    return this.dogsService.getManyAvailable(query);
  }

  @Get("/:id")
  async getDog(@Param("id") id: number) {
    return this.dogsService.getAvailableById(id);
  }
}
