import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "./event.controller";
import { Event } from "../../database/entities/Event";

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventController],
    exports: [],
})
export class EventModule {}
