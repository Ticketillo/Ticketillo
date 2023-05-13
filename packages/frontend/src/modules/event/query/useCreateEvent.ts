import { useMutation } from "@tanstack/react-query";
import { EventApi } from "api/service";
import { EventService } from "services/EventService";

interface EventCreateParams {
    name: string | undefined;
    description: string | undefined;
    date: Date | undefined;
    attendees: number | undefined;
    image: string;
    price: number | undefined;
    location: string | undefined;
}

export default function useCreateEvent() {
    return useMutation(({ name, description, date, attendees, image, price, location }: EventCreateParams) =>
        EventApi.createEvent(_, name, description, image, _, attendees, price),
    );
}
