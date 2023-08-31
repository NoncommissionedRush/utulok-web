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
import { Adoption, Dog } from "../../../types";
import { MailingService } from "../mailing/mailing.service";

@Controller("dogs")
@UseInterceptors(ClassSerializerInterceptor)
export class DogsController {
  constructor(
    private readonly dogsService: DogsService,
    private readonly adoptionService: AdoptionService,
    private readonly mailingService: MailingService
  ) {}

  @Post("/adopt")
  async adopt(@Body() dto: AdoptDogDto): Promise<Adoption> {
    const adoption = await this.adoptionService.createAdoption(dto);

    await this.mailingService.sendNewAdoptionRequestNotification(dto)

    return adoption;
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
