import { Entity, OneToOne } from "typeorm";
import { AbstractAdoptionEntity } from "./abstract.adoption";
import { DogEntity } from "./dog.entity";
import { Adoption } from "../@types";

@Entity()
export class StandardAdoption extends AbstractAdoptionEntity implements Adoption {
  @OneToOne(() => DogEntity, dog => dog.adoption, { eager: true})
  dog: DogEntity
}
