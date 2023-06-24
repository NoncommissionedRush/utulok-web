import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { Age, EligibleFor, Sex, Size } from "src/entities/dog.entity";

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
  elibigleFor?: EligibleFor
}
