import { PropsWithChildren } from "react";
import { ToastProvider } from "@peersyst/react-components";
import QueryClientProvider from "./query/QueryClientProvider";
import { ConfigProvider } from "./config";
import ErrorHandler from "./common/components/feedback/ErrorHandler/ErrorHandler";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <ConfigProvider>
        <ToastProvider>
            <ErrorHandler>
                <QueryClientProvider>{children}</QueryClientProvider>
            </ErrorHandler>
        </ToastProvider>
    </ConfigProvider>
);

export default Providers;
