import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Event } from "./Event";

@Entity("user")
export class User {
    @PrimaryColumn({ type: "varchar", length: 255 })
    address: string;

    @Column({ type: "varchar", length: 64 })
    name: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "text", nullable: true })
    image?: string;

    @OneToMany(() => Event, (event) => event.user)
    events?: Event[];
}
