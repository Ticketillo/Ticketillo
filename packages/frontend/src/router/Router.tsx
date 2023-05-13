import { BrowserRouter, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { config } from "config";

import HomePage from "modules/home/pages/HomePage";
import { eventRouter } from "modules/event/EventRouter";

import Logo from "modules/home/components/Logo";
import UserMenu from "modules/home/components/UserMenu";

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
            <main className="sm:mx-auto flex w-full max-w-5xl flex-col items-start p-5">
                <header className="flex items-center justify-between w-full">
                    <Logo />
                    <UserMenu />
                </header>
                <Routes />
            </main>
        </BrowserRouter>
    );
};

export default Router;
