import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { Age, Sex, Size, EligibleFor } from "../../../types";

export class DogsFilter {
  @IsEnum(Age)
  @IsOptional()
  age?: Age;

  @IsEnum(Sex)
  @IsOptional()
  sex?: Sex;

  @IsEnum(Size)
  @IsOptional()
  size?: Size;

  @IsBoolean()
  @IsOptional()
  isKidFriendly?: boolean;

  @IsBoolean()
  @IsOptional()
  isVaccinated?: boolean;

  @IsBoolean()
  @IsOptional()
  isCastrated?: boolean;

  @IsEnum(EligibleFor)
  @IsOptional()
  eligibleFor?: EligibleFor
}
