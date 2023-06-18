import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Age, Sex, Size } from "src/entities/dog.entity";

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
