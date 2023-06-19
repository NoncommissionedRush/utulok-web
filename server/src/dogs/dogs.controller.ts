import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CreateDogDto } from "../dtos/create-dog.dto";
import { DogsService } from "./dogs.service";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { UpdateDogDto } from "src/dtos/update-dog.dto";

@Controller("dogs")
export class DogsController {
  constructor(
    private readonly dogsService: DogsService,
  ) {}

  @Post("/create")
  @UseGuards(AuthGuard)
  async createDog(dto: CreateDogDto) {
    return this.dogsService.create(dto);
  }

  @Get("/")
  async getDogs(@Query() query: DogsFilter) {
    return this.dogsService.get(query);
  }

  @Get("/:id")
  async getDog(@Param("id") id: number) {
    return this.dogsService.getById(id);
  }

  @Put("/:id")
  @UseGuards(AuthGuard)
  async update(@Param("id") id: number, @Query() query: UpdateDogDto) {
    return this.dogsService.update(id, query);
  }
}
