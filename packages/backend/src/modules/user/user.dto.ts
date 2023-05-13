import { User } from "../../database/entities/User";

export class UserDto {
    address: string;
    name: string;
    description: string;
    image: string;
    // events: EventDto[];

    static fromEntity(user: User): UserDto {
        return {
            address: user.address,
            name: user.name,
            description: user.description,
            image: user.image,
            // events: user.events.map(event => EventDto.fromEntity(event)),
        };
    }
}
