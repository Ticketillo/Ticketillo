import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Providers from "Providers";
import Router from "router/Router";
import "OpenApiConfig";
import "polyfills";
import useLoad from "hooks/useLoad";
import { Pinwheel } from "@uiball/loaders";

import "./styles/globals.css";

const App = (): JSX.Element | null => {
    const loading = useLoad();

    return loading ? (
        <div className="flex h-screen">
            <div className="m-auto">
                <Pinwheel size={100} lineWeight={3.5} speed={1} color="#334059" />
            </div>
        </div>
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
