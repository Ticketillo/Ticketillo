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

    @PrimaryColumn({ type: "varchar", length: 255 })
    address: string;

    @Column({ type: "varchar", length: 64 })
    name: string;

    @Column({ type: "text" })
    data: string;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: "user" })
    user: User;
}
