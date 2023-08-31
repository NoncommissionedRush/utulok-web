import { Entity, ManyToOne } from "typeorm";
import { AbstractAdoptionEntity } from "./abstract.adoption";
import { DogEntity } from "./dog.entity";
import { Adoption } from "../../../types";

@Entity()
export class VirtualAdoption extends AbstractAdoptionEntity implements Adoption {
    @ManyToOne(() => DogEntity, dog => dog.virtualAdoptions)
    dog: DogEntity
}