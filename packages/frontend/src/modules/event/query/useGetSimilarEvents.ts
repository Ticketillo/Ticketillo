import { useQuery } from "@tanstack/react-query";
import { EventApi } from "api/service";
import shuffle from "utils/shuffle";

export default function useGetSimilarEvents(id: number | string | undefined) {
    return useQuery(
        ["events"],
        async () => {
            const events = await EventApi.getAll();
            return shuffle(events).slice(0, 4);
        },
        { enabled: id !== undefined },
    );
}
