import { useMutation } from "@tanstack/react-query";
import { useAuthState } from "modules/auth/state";
import { EventService } from "services/EventService";

interface EventCreateParams {
    name: string;
    description: string;
    attendees: number;
    image: File;
    price: number;
}

export default function useCreateEvent() {
    const { address } = useAuthState();

    return useMutation(({ name, description, attendees, image, price }: EventCreateParams) =>
        EventService.createEvent(address!, name, description, image, "", attendees, price.toString()),
    );
}
