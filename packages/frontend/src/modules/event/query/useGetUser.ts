import { useQuery } from "@tanstack/react-query";
import { UserApi } from "api/service";
import { UserDto } from "models";
import { QueryResult } from "query/react-query-overrides";

export default function useGetUser(address: string | undefined): QueryResult<UserDto> {
    return useQuery(
        ["user", address],
        () => {
            return UserApi.getUser(address!);
        },
        { enabled: address !== undefined },
    );
}
