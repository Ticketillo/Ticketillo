import { useQuery } from "@tanstack/react-query";

export default function useGetSimilarEvents(id: number | string | undefined): any {
    return useQuery(
        ["event", id],
        () => [
            {
                image: "https://picsum.photos/200/300",
                name: "Tomorrowland",
                description: "Tomorrowland is the biggest electronic music festival in the world.",
                date: 1683978684,
                location: "Boom, Belgium",
                user: {
                    id: 1,
                    name: "John Doe",
                },
                limit: 10000,
                sold: 5000,
            },
            {
                image: "https://picsum.photos/200/300",
                name: "Tomorrowland",
                description: "Tomorrowland is the biggest electronic music festival in the world.",
                date: 1683978684,
                location: "Boom, Belgium",
                user: {
                    id: 1,
                    name: "John Doe",
                },
                limit: 10000,
                sold: 5000,
            },
            {
                image: "https://picsum.photos/200/300",
                name: "Tomorrowland",
                description: "Tomorrowland is the biggest electronic music festival in the world.",
                date: 1683978684,
                location: "Boom, Belgium",
                user: {
                    id: 1,
                    name: "John Doe",
                },
                limit: 10000,
                sold: 5000,
            },
        ],
        { enabled: id !== undefined },
    );
}
