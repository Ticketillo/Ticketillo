import { BrowserRouter, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { config } from "config";

import HomePage from "modules/home/pages/HomePage";
import { eventRouter } from "modules/event/EventRouter";

import Logo from "modules/home/components/Logo";
import UserMenu from "modules/home/components/UserMenu";
import EventPage from "modules/event/pages/PageEvent";

const Routes = () => {
    return useRoutes([
        {
            path: "/",
            element: <HomePage />,
        },
        ...eventRouter,
        {
            path: "/event/:id",
            element: <EventPage />,
        },
    ]);
};

const Router = (): JSX.Element => {
    return (
        <BrowserRouter basename={config.publicUrl}>
            <ScrollToTop />
            <main className="sm:mx-auto flex w-full max-w-5xl flex-col items-start p-5">
                <header className="flex items-center justify-between w-full py-2 sticky">
                    <Logo />
                    <UserMenu />
                </header>
                <Routes />
            </main>
        </BrowserRouter>
    );
};

export default Router;
