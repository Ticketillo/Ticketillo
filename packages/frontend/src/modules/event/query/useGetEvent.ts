import { useQuery } from "@tanstack/react-query";
import { FullEventDto } from "models";
import { QueryResult } from "query/react-query-overrides";
import { EventService } from "services/EventService";

export default function useGetEvent(id: number | string | undefined): QueryResult<FullEventDto> {
    return useQuery(["event", id], () => EventService.getEvent(typeof id === "string" ? parseInt(id) : id!), { enabled: id !== undefined });
}
