import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "../../database/entities/Event";
import { EventDto } from "./event.dto";
import { CreateEventRequest } from "./create-event.request";

@ApiTags("event")
@Controller("event")
@ApiErrorDecorators()
export class EventController {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {}

    @Post()
    @ApiOperation({ description: "Create an event" })
    async createEvent(request: CreateEventRequest): Promise<EventDto> {
        const event = await this.eventRepository.save({
            address: request.address,
            name: request.name,
            data: request.data
        });
        return EventDto.fromEntity(event);
    }

    @Get(":id")
    @ApiOperation({ description: "Get an event" })
    async getEvent(@Param("id") id: number): Promise<EventDto> {
        const event = await this.eventRepository.findOne({ where: { id }, relations: ["user"] });
        return EventDto.fromEntity(event);
    }

    @Get("")
    @ApiOperation({ description: "Get all events" })
    async getAll(): Promise<EventDto[]> {
        const events = await this.eventRepository.find({ relations: ["user"] });
        return events.map((event) => EventDto.fromEntity(event));
    }

}
