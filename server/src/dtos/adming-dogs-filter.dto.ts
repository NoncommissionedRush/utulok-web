import { DogStatus } from "src/entities/dog.entity";
import { DogsFilter } from "./dogs-filter.dto";
import { IsEnum, IsOptional } from "class-validator";

export enum StatusFilter {
  AVAILABLE = DogStatus.AVAILABLE,
  ADOPTED = DogStatus.ADOPTED,
  ALL = 'all'
}

export class AdminDogsFilter extends DogsFilter {
 
  @IsEnum(StatusFilter)
  @IsOptional()
  status?: StatusFilter = StatusFilter.ALL
}
