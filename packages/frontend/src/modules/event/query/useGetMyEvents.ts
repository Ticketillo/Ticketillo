import { useQuery } from "@tanstack/react-query";
import { EventApi } from "../../../api/service";

export default function useGetMyEvents(id: number | string | undefined) {
    return useQuery(
        ["my-events", id],
        async () => {
            return (await EventApi.getAll()).filter((event) => event.id === id);
        },
        { enabled: id !== undefined },
    );
}
