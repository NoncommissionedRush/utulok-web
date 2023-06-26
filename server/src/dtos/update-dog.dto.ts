import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { Dog } from "../@types";
import { Age, DogStatus, EligibleFor, Sex, Size } from "../entities/dog.entity";

export class UpdateDogDto implements Partial<Dog> {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(Size)
    @IsOptional()
    size?: Size;

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
}

