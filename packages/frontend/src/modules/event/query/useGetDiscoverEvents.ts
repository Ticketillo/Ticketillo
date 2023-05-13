import { useQuery } from "@tanstack/react-query";
import { EventApi } from "../../../api/service";
import { QueryResult } from "../../../query/react-query-overrides";
import { EventDto } from "../../../models";

export default function useGetDiscoverEvents(): QueryResult<EventDto[]> {
    return useQuery(
        ["discover-events",],
        () => {
            return EventApi.getAll()
        },
        { enabled: true },
    );
}
