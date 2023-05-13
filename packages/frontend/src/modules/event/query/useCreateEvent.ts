import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "modules/auth/state";
import { EventService } from "services/EventService";
import { utils } from "ethers";

interface EventCreateParams {
    name: string;
    description: string;
    attendees: number;
    image: File;
    price: string;
    location: string;
}

interface UseCreateEventParams {
    onSuccess?: () => void;
}

export default function useCreateEvent({ onSuccess }: UseCreateEventParams) {
    const { address } = useAuthState();

    const queryClient = useQueryClient();

    return useMutation(
        ({ name, description, attendees, image, price, location }: EventCreateParams) =>
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
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["user"]);
                await queryClient.invalidateQueries(["my-events"]);
                await queryClient.invalidateQueries(["discover-events"]);
                onSuccess?.();
            },
        },
    );
}
