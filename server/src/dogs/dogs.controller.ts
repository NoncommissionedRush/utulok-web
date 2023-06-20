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
import { AdoptDogDto } from "src/dtos/adopt-dog.dto";
import { Status } from "src/entities/dog.entity";
import { AdminDogsFilter } from "src/dtos/adming-dogs-filter.dto";

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

  @Post("/adopt")
  async adopt(@Query() query: AdoptDogDto) {
    //TODO: send email
    return this.dogsService.update(query.dogId, { status: Status.RESERVED });
  }

  @Get("/")
  async getAvailableDogs(@Query() query: DogsFilter) {
    return this.dogsService.getAvailable(query);
  }

  @Get("/admin")
  @UseGuards(AuthGuard)
  async getDogsAdmin(@Query() query: AdminDogsFilter) {
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
