import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AdoptionType } from "../../../types";

export class AdoptDogDto {
  @IsNumber()
  @IsNotEmpty()
  dogId: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsEnum(AdoptionType)
  type: AdoptionType;
}
