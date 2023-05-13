import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Providers from "Providers";
import Router from "router/Router";
import { useLoad } from "ui/common/hooks/useLoad";
import "data-access/api/OpenApiConfig";
import "polyfills";

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
