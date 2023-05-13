import { BrowserRouter, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { config } from "config";

import HomePage from "modules/home/pages/HomePage";
import ProfilePage from "modules/profile/pages/ProfilePage";
import { eventRouter } from "modules/event/EventRouter";

import Logo from "modules/home/components/Logo";
import UserMenu from "modules/home/components/UserMenu";
import EventPage from "modules/event/pages/PageEvent";

import MyEventsPage from "modules/event/pages/MyEventsPage";
import DiscoverPage from "modules/event/pages/DiscoverPage";

const Routes = () => {
    return useRoutes([
        {
            path: "/",
            element: <HomePage />,
            children: [
                {
                    path: "your-events",
                    element: <MyEventsPage />,
                },
                {
                    path: "discover",
                    element: <DiscoverPage />,
                },
            ],
        },
        {
            path: "/profile",
            element: <ProfilePage />,
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
                <header className="flex items-center justify-between w-full pb-16 pt-2">
                    <Logo />
                    <UserMenu />
                </header>
                <Routes />
            </main>
        </BrowserRouter>
    );
};

export default Router;
