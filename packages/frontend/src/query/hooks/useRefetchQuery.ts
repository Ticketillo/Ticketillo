import { useQueryClient, QueryKey, RefetchOptions } from "@tanstack/react-query";

export const useRefetchQuery = (): ((queryKey: QueryKey, options?: RefetchOptions) => Promise<void>) => {
    const queryClient = useQueryClient();

    async function refetch(queryKey: QueryKey, options?: RefetchOptions): Promise<void> {
        await queryClient.refetchQueries({ queryKey, exact: true }, options);
    }

    return refetch;
};
