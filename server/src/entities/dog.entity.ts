import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VirtualAdoption } from "./virtual-adoption.entity";
import { StandardAdoption } from "./standard-adoption.entity";
import { TemporaryAdoption } from "./temporary-adoption.entity";

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

export enum EligibleFor {
  STANDARD = 'standard',
  VIRTUAL_ONLY = 'virtual_only',
}

@Entity()
export class DogEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
    enum: DogStatus,
    default: DogStatus.AVAILABLE
  })
  status: DogStatus;

  @Column({
    type: 'enum',
    enum: EligibleFor,
    default: EligibleFor.STANDARD
  })
  eligibleFor: EligibleFor;

  @Column({ nullable: true })
  breed?: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  isKidFriendly?: boolean;

  @Column({ nullable: true })
  isVaccinated?: boolean;

  @Column({ nullable: true })
  isCastraded?: boolean;

  @OneToOne(() => StandardAdoption, adoption => adoption.dog)
  @JoinColumn()
  adoption: StandardAdoption[]

  @OneToOne(() => TemporaryAdoption, adoption => adoption.dog)
  temporaryAdoption: TemporaryAdoption

  @OneToMany(() => VirtualAdoption, adoption => adoption.dog)
  virtualAdoptions: VirtualAdoption[]

  @Column({
    type: 'bigint',
    transformer: {
      to(value: number): number {
        return value;
      },
      from(value: string): number {
        return parseInt(value, 10);
      },
    },
  })
  createdTs: number;

  @BeforeInsert()
  beforeInsertActions() {
    this.createdTs = Date.now()
  }
}
