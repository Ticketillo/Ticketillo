import { BrowserRouter, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { config } from "config";

import HomePage from "modules/home/pages/HomePage";
import { eventRouter } from "modules/event/EventRouter";

const Routes = () => {
    return useRoutes([
        {
            path: "/",
            element: <HomePage />,
        },
        ...eventRouter,
    ]);
};

const Router = (): JSX.Element => {
    return (
        <BrowserRouter basename={config.publicUrl}>
            <ScrollToTop />
            <Routes />
        </BrowserRouter>
    );
};

export default Router;
