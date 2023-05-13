import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from "@tanstack/react-query";

function handleQueryClientError(_error: any): void {
    // Show error toast
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 600000,
            onError: handleQueryClientError,
            networkMode: "offlineFirst",
        },
        mutations: {
            onError: handleQueryClientError,
            networkMode: "offlineFirst",
        },
    },
});

const QueryClientProvider = ({ children }: PropsWithChildren): JSX.Element => {
    return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
};

export default QueryClientProvider;
