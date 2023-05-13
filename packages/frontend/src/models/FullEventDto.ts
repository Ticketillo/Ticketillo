import { EventDto } from "../../../backend/src/modules/event/event.dto";

export class FullEventDto extends EventDto {
    seats?: number;
    boughtSeats?: number;
    seatPrice?: string;

    static fromEventDto(eventDto: EventDto, seats: number, boughtSeats: number, seatPrice: string): FullEventDto {
        return {
            ...eventDto,
            seats,
            boughtSeats,
            seatPrice,
        }
    }
}
