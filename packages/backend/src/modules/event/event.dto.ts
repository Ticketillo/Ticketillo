import { Event } from "../../database/entities/Event";
import { EventAttributeDto } from "./event-attribute.dto";
import { User } from "../../database/entities/User";
import { UserDto } from "../user/user.dto";

export class EventDto {
    id: number;
    address: string;
    creatorAddress?: string;
    name: string;
    description: string;
    external_url: string;
    image: string;
    attributes: EventAttributeDto[];
    user?: User;

    static fromEntity(event: Event): EventDto {
        const info = JSON.parse(event.data);
        return {
            id: event.id,
            name: event.name,
            address: event.address,
            creatorAddress: event.creatorAddress,
            description: info.description,
            external_url: info.external_url,
            image: info.image,
            attributes: info.attributes,
            user: event.user ? UserDto.fromEntity(event.user) : undefined
        };
    }
}

