import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common";
import { CreateDogDto } from "../dtos/create-dog.dto";
import { DogsService } from "./dogs.service";
import { DogsFilter } from "src/dtos/dogs-filter.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { UpdateDogDto } from "src/dtos/update-dog.dto";
import { AdoptDogDto } from "src/dtos/adopt-dog.dto";
import { AdminDogsFilter } from "src/dtos/adming-dogs-filter.dto";
import { AdoptionStatus } from "../entities/abstract.adoption";
import { AdoptionService } from "../adoption/adoption.service";

@Controller("dogs")
export class DogsController {
  constructor(
    private readonly dogsService: DogsService,
    private readonly adoptionService: AdoptionService
  ) {}

  @Post("/create")
  @UseGuards(AuthGuard)
  async createDog(dto: CreateDogDto) {
    return this.dogsService.create(dto);
  }

  @Post("/adopt")
  async adopt(@Query() query: AdoptDogDto) {
    //TODO: send email to admin
    return this.adoptionService.createAdoption(query);
  }

  @Post("process-adoption")
  @UseGuards(AuthGuard)
  async processAdoption(@Query("id") id: number, @Query("status") status: AdoptionStatus) {
    //TODO: send email to adopter
    this.adoptionService.processAdoption(id, status);
  }

  @Get("/pending-adoptions")
  @UseGuards(AuthGuard)
  async getPendingAdoptions() {
    return this.adoptionService.getPendingAdoptions();
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
  async getDog(@Param("id") id: number, @Session() session: Record<string, any>) {
    return this.dogsService.getById(id, session);
  }

  @Put("/:id")
  @UseGuards(AuthGuard)
  async update(@Param("id") id: number, @Query() query: UpdateDogDto) {
    return this.dogsService.update(id, query);
  }
}
