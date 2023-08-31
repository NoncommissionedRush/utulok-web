import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, IsUrl } from "class-validator";
import { Dog, Size, Age, Sex, DogStatus, EligibleFor } from "../../../types";

export class UpdateDogDto implements Partial<Dog> {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(Size)
    @IsOptional()
    size?: Size;

    @IsUrl()
    @IsOptional()
    mainImageUrl?: string;

    @IsEnum(Age)
    @IsOptional()
    age?: Age;

    @IsEnum(Sex)
    @IsOptional()
    sex?: Sex;

    @IsEnum(DogStatus)
    @IsOptional()
    status?: DogStatus;

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
    isVaccinated?: boolean;

    @IsBoolean()
    @IsOptional()
    isCastrated?: boolean;

    @IsEnum(EligibleFor)
    @IsOptional()
    eligibleFor?: EligibleFor;

    @IsArray({ each: true })
    @IsUrl()
    @IsOptional()
    images: string[]
}

