import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VirtualAdoption } from "./virtual-adoption.entity";
import { StandardAdoption } from "./standard-adoption.entity";
import { TemporaryAdoption } from "./temporary-adoption.entity";
import { Size, Dog, Sex, Age, DogStatus, EligibleFor } from "../../../types"
import { ImageEntity } from "./image.entity";


@Entity()
export class DogEntity implements Dog {
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
  breed: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  isKidFriendly: boolean;

  @Column({ nullable: true })
  isVaccinated: boolean;

  @Column({ nullable: true })
  isCastrated: boolean;

  @OneToOne(() => StandardAdoption, adoption => adoption.dog)
  adoption: StandardAdoption[]

  @OneToOne(() => TemporaryAdoption, adoption => adoption.dog)
  temporaryAdoption: TemporaryAdoption

  @OneToMany(() => VirtualAdoption, adoption => adoption.dog)
  virtualAdoptions: VirtualAdoption[]

  @Column({ nullable: true })
  mainImageUrl: string;

  @OneToMany(() => ImageEntity, img => img.dog, { cascade: true })
  images: ImageEntity[]

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
