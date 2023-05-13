import { useQuery } from "@tanstack/react-query";
import { FullEventDto } from "models";
import { QueryResult } from "query/react-query-overrides";

export default function useGetEvent(id: number | string | undefined): QueryResult<FullEventDto> {
    return useQuery(
        ["event", id],
        //() => EventService.getEvent(typeof id === "string" ? parseInt(id) : id!),
        () => ({
            id: 1,
            address: "0x00000000",
            name: "Tomorrowland ieubiuwbv rivubevubeuvb",
            description: "Tomorrowland is the biggest electronic music festival in the world.",
            external_url: "https://www.tomorrowland.com/",
            image: "https://picsum.photos/200",
            attributes: [
                {
                    trait_type: "Date",
                    display_type: "date",
                    value: 1683978684,
                },
                {
                    trait_type: "location",
                    value: "Boom, Belgium",
                },
            ],
            creator: {
                id: 1,
                name: "John Doe",
            },
            seats: 10000,
            boughtSeats: 5000,
            seatPrice: "100000000000000000000",
        }),
        { enabled: id !== undefined },
    );
}
