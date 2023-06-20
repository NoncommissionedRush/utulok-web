import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { Age, Sex, Size, Status } from "src/entities/dog.entity";

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsEnum(Size)
  @IsNotEmpty()
  size: Size;

  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @IsEnum(Age)
  age: Age;

  @IsString()
  @IsOptional()
  breed?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status = Status.AVAILABLE;

  @IsBoolean()
  @IsOptional()
  isKidFriendly?: boolean;

  @IsBoolean()
  @IsOptional()
  isVaccinated: boolean;

  @IsBoolean()
  @IsOptional()
  isCastrated: boolean;
}
