import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { Age, EligibleFor, Sex, Size, DogStatus } from "src/entities/dog.entity";

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
  @IsOptional()
  age?: Age;

  @IsString()
  @IsOptional()
  breed?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(DogStatus)
  @IsOptional()
  status?: DogStatus = DogStatus.AVAILABLE;

  @IsEnum(EligibleFor)
  @IsOptional()
  eligibleFor?: EligibleFor = EligibleFor.STANDARD;

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
