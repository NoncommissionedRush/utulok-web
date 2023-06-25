import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { AdoptionStatus, AdoptionType } from "../entities/abstract.adoption";

export class ProcessAdoptionDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsEnum(AdoptionStatus)
    @IsNotEmpty()
    type: AdoptionType
    
    @IsEnum(AdoptionStatus)
    @IsNotEmpty()
    status: AdoptionStatus;
}