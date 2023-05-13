import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from "@tanstack/react-query";
import { toast } from "components/use-toast";

function handleQueryClientError(): void {
    toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
    });
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
