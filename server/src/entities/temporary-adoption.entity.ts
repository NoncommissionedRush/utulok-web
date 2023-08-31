import { Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstractAdoptionEntity } from "./abstract.adoption";
import { DogEntity } from "./dog.entity";
import { Adoption } from "../../../types";

@Entity()
export class TemporaryAdoption extends AbstractAdoptionEntity implements Adoption {
    @OneToOne(() => DogEntity, dog => dog.temporaryAdoption)
    @JoinColumn()
    dog: DogEntity
}