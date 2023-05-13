import { EventDto } from "models";
import { EventAttributeDto } from "./api/models/EventAttributeDto";

export interface IFullEventDto extends EventDto {
    seats?: number;
    boughtSeats?: number;
    seatPrice?: string;
}

export class FullEventDto implements IFullEventDto {
    id: number;
    address: string;
    creatorAddress?: string;
    name: string;
    description: string;
    external_url: string;
    image: string;
    attributes: Array<EventAttributeDto>;
    seats?: number;
    boughtSeats?: number;
    seatPrice?: string;

    static fromEventDto(eventDto: EventDto, seats: number, boughtSeats: number, seatPrice: string): FullEventDto {
        return {
            ...eventDto,
            seats,
            boughtSeats,
            seatPrice,
        };
    }
}
