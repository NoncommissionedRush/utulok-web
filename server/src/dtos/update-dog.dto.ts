import { CreateDogDto } from "./create-dog.dto";
import {PartialType} from "@nestjs/swagger"

export class UpdateDogDto extends PartialType(CreateDogDto) {}

