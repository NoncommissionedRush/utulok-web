import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdoptionEntity } from "./adoption.entity";

export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big",
}

export enum Sex {
  MALE,
  FEMALE,
}

export enum Age {
  PUPPY = "puppy",
  TEENAGER = "teen",
  ADULT = "adult",
  SENIOR = "senior",
}

export enum DogStatus {
  AVAILABLE = 'available',
  ADOPTED = 'adopted',
  DECEASED = 'deceased'
}

}

@Entity()
export class DogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Size,
  })
  size: Size;

  @Column({
    type: "enum",
    enum: Sex,
  })
  sex: Sex;

  @Column({
    type: "enum",
    enum: Age,
  })
  age: Age;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.AVAILABLE
  })
  status: Status;

  @Column({ nullable: true })
  breed: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  isKidFriendly: boolean;

  @Column({ nullable: true })
  isVaccinated: boolean;

  @Column({ nullable: true })
  isCastraded: boolean;

  @OneToOne(() => AdoptionEntity, adoption => adoption.dog) 
  @JoinColumn()
  adoption: AdoptionEntity
}
