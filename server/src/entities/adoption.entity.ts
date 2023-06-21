import { Column, OneToOne } from "typeorm";
import { DogEntity } from "./dog.entity";

export enum AdoptionType {
  STANDARD = 'standard',
  VIRTUAL = 'virtual',
  TEMPORARY = 'temp'
}

export class AdoptionEntity {
  @Column({
    type: 'enum',
    enum: AdoptionType
  })
  type: AdoptionType   

  @Column()
  adopterEmail?: string;

  @Column()
  adopterPhone?: string;

  @OneToOne(() => DogEntity, dog => dog.adoption)
  dog: DogEntity
}
