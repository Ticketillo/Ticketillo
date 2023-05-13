import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "../../database/entities/Event";
import { EventDto } from "./event.dto";
import { CreateEventRequest } from "./create-event.request";
import { User } from "../../database/entities/User";
import generateName from "../user/name-generator/generate-name";

@ApiTags("event")
@Controller("event")
@ApiErrorDecorators()
export class EventController {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>,
                @InjectRepository(User) private readonly userRepository: Repository<User>) {}

    @Post()
    @ApiOperation({ description: "Create an event" })
    async createEvent(@Body() request: CreateEventRequest): Promise<EventDto> {
        const user = await this.userRepository.findOne({ where: { address: request.creator_address } });
        if (!user) {
            await this.userRepository.save({
                address: request.address,
                name: generateName(),
                description: "",
                image: "https://picsum.photos/200/300",
            })
        }
        let event: any;
        if (request.id) {
            event = await this.eventRepository.findOne({ where: { id: request.id } });
            event.address = request.address;
            event.creatorAddress = request.creator_address;
            event.name = request.name;
            event.data = request.data;
            await this.eventRepository.save(event);
        }
        else {
            event = await this.eventRepository.save({
                address: request.address,
                creatorAddress: request.creator_address,
                name: request.name,
                data: request.data
            });
        }
        return this.getEvent(event.id)
    }

    @Get(":id/:token")
    @ApiOperation({ description: "Get an event" })
    async getEventToken(@Param("id") id: number, @Param("token") token: string): Promise<EventDto> {
        const event = await this.eventRepository.findOne({ where: { id }, relations: ["user"] });
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
