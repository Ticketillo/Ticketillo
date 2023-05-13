import { useMutation } from "@tanstack/react-query";
import { useAuthState } from "modules/auth/state";
import { EventService } from "services/EventService";
import { utils } from "ethers";

interface EventCreateParams {
    name: string;
    description: string;
    attendees: number;
    image: File;
    price: number;
    location: string;
}

export default function useCreateEvent() {
    const { address } = useAuthState();

    return useMutation(({ name, description, attendees, image, price, location }: EventCreateParams) =>
        EventService.createEvent(
            address!,
            name,
            description,
            image,
            "",
            attendees,
            utils.parseEther(price.toString()).toString(),
            location,
        ),
    );
}
