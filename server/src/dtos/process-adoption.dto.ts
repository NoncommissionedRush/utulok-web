import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { AdoptionApprovalStatus, AdoptionType } from "../../../types";

export class ProcessAdoptionDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsEnum(AdoptionType)
    @IsNotEmpty()
    type: AdoptionType
    
    @IsEnum(AdoptionApprovalStatus)
    @IsNotEmpty()
    status: AdoptionApprovalStatus;
}