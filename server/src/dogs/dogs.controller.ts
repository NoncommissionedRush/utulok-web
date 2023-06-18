import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateDogDto } from "../dtos/create-dog.dto";
import { DogsService } from "./dogs.service";
import { DogsFilter } from "src/dtos/dogs-filter.dto";

@Controller("dogs")
export class DogsController {
  constructor(
    private readonly dogsService: DogsService,
  ) {}

  @Post("/create")
  async createDog(dto: CreateDogDto) {
    return this.dogsService.create(dto);
  }

  @Get("/")
  async getDogs(@Query() query: DogsFilter) {
    return this.dogsService.get(query)
  }

  @Get('/:id')
  async getDog(@Param('id') id: number) {
    return this.dogsService.getById((id)) 
  }
}
