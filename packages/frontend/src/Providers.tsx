import { PropsWithChildren } from "react";
import QueryClientProvider from "./query/QueryClientProvider";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => <QueryClientProvider>{children}</QueryClientProvider>;

export default Providers;
