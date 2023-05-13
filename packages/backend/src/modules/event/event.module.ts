import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "./event.controller";
import { Event } from "../../database/entities/Event";
import { User } from "../../database/entities/User";

@Module({
    imports: [TypeOrmModule.forFeature([Event]), TypeOrmModule.forFeature([User])],
    controllers: [EventController],
    exports: [],
})
export class EventModule {}
