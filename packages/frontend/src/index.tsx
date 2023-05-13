import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Providers from "Providers";
import Router from "router/Router";
import "OpenApiConfig";
import "polyfills";
import useLoad from "hooks/useLoad";

const App = (): JSX.Element | null => {
    const loading = useLoad();

    return loading ? (
        <div>Loading</div>
    ) : (
        <Suspense fallback={<div>Loading</div>}>
            <Providers>
                <Router />
            </Providers>
        </Suspense>
    );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
