import { useQueryClient, QueryKey, RefetchOptions } from "@tanstack/react-query";

export const useRefetchQueries = (): ((queryKeys: QueryKey[], options?: RefetchOptions) => Promise<void>) => {
    const queryClient = useQueryClient();

    async function refetch(queryKeys: QueryKey[], options?: RefetchOptions): Promise<void> {
        await Promise.all(queryKeys.map((queryKey) => queryClient.refetchQueries({ queryKey }, options)));
    }

    return refetch;
};
