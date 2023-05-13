import { useMutation } from "@tanstack/react-query";

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
    const mock = async (data: EventCreateParams) => {
        return data;
    };

    return useMutation((data: EventCreateParams) => mock(data));
}
