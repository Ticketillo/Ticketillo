import { useQuery } from "@tanstack/react-query";

export default function useGetEvent(id: number | string | undefined): any {
    return useQuery(
        ["event", id],
        () => ({
            image: "https://picsum.photos/200/300",
            name: "Tomorrowland",
            description: "Tomorrowland is the biggest electronic music festival in the world.",
            date: "2021-07-29T00:00:00.000Z",
            location: "Boom, Belgium",
            user: {
                id: 1,
                name: "John Doe",
            },
            limit: 10000,
            sold: 5000,
        }),
        { enabled: id !== undefined },
    );
}
