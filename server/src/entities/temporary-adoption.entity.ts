import { OneToOne } from "typeorm";
import { AbstractAdoptionEntity } from "./abstract.adoption";
import { DogEntity } from "./dog.entity";
import { Adoption } from "../@types";

export class TemporaryAdoption extends AbstractAdoptionEntity implements Adoption {
    @OneToOne(() => DogEntity, dog => dog.temporaryAdoption)
    dog: DogEntity
}