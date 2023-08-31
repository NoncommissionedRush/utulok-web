import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DogEntity } from "./dog.entity";


@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => DogEntity, dog => dog.images, { onDelete: 'CASCADE'})
  dog: DogEntity;

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
