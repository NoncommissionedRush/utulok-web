import { BeforeInsert, Column, PrimaryGeneratedColumn } from "typeorm";

export enum AdoptionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export enum AdoptionType {
  STANDARD = 'standard',
  VIRTUAL = 'virtual',
  TEMPORARY = 'temp'
}

export abstract class AbstractAdoptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AdoptionStatus,
        default: AdoptionStatus.PENDING,
    })
    status: AdoptionStatus;

    @Column({ nullable: true})
    adopterEmail?: string;

    @Column({ nullable: true})
    adopterPhone?: string;

    @Column({
        type: 'enum',
        enum: AdoptionType
    })
    type: AdoptionType

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
    private beforeInsertActions() {
        this.createdTs = Date.now()
    }
}