import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne, JoinColumn, PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("event")
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 64, nullable: true })
    address?: string;

    @Column({ type: "varchar", length: 64 })
    name: string;

    @Column({ type: "text" })
    data: string;

    @Column({ name: "creator_address", type: "varchar", length: 255, nullable: true })
    creatorAddress?: string;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: "creator_address" })
    user?: User;
}
