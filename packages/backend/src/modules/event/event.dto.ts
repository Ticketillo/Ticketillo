import { Event } from "../../database/entities/Event";
import { EventAttributeDto } from "./event-attribute.dto";

export class EventDto {
    id: number;
    address: string;
    name: string;
    description: string;
    external_url: string;
    image: string;
    attributes: EventAttributeDto[];

    static fromEntity(event: Event): EventDto {
        const info = JSON.parse(event.data);
        return {
            id: event.id,
            name: event.name,
            address: event.address,
            description: info.description,
            external_url: info.external_url,
            image: info.image,
            attributes: info.attributes,
        };
    }
}

