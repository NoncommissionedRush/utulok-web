import { BeforeInsert, Column, PrimaryGeneratedColumn } from "typeorm";
import { AdoptionApprovalStatus, AdoptionType } from "../../../types";
export abstract class AbstractAdoptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AdoptionApprovalStatus,
        default: AdoptionApprovalStatus.PENDING,
    })
    approvalStatus: AdoptionApprovalStatus;

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