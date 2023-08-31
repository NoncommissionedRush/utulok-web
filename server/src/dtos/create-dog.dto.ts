import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { Dog, Size, Sex, Age, DogStatus, EligibleFor, Image } from "../../../types";

export class CreateDogDto implements Omit<Dog, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsOptional()
  mainImageUrl: string;

  @IsEnum(Size)
  @IsNotEmpty()
  size: Size;

  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @IsEnum(Age)
  @IsOptional()
  age: Age;

  @IsString()
  @IsOptional()
  breed: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsEnum(DogStatus)
  @IsOptional()
  status: DogStatus = DogStatus.AVAILABLE;

  @IsEnum(EligibleFor)
  @IsOptional()
  eligibleFor: EligibleFor = EligibleFor.STANDARD;

  @IsBoolean()
  @IsOptional()
  isKidFriendly: boolean;

  @IsBoolean()
  @IsOptional()
  isVaccinated: boolean;

  @IsBoolean()
  @IsOptional()
  isCastrated: boolean;

  @IsArray({each: true})
  @IsUrl()
  @IsOptional()
  images: string[]
}
