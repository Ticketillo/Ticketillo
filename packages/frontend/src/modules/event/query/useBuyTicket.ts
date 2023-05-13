import { useMutation } from "@tanstack/react-query";
import { EventDto } from "models";
import { EventService } from "services/EventService";

export default function useBuyTicket() {
    return useMutation((event: EventDto) => EventService.buyTicket(event));
}
