import { BrowserRouter, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { config } from "config";
import HomePage from "modules/home/pages/HomePage";
import ProfilePage from "modules/profile/pages/ProfilePage";
import Logo from "modules/home/components/Logo";
import UserMenu from "modules/home/components/UserMenu";
import EventPage from "modules/event/pages/EventPage";

import MyEventsPage from "modules/event/pages/MyEventsPage";
import DiscoverPage from "modules/event/pages/DiscoverPage";
import TicketsPage from "modules/ticket/pages/TicketsPage";
import LoggedInRoute from "modules/auth/components/LoggedInRoute";

const Routes = () => {
    return useRoutes([
        {
            path: "/",
            element: <HomePage />,
            children: [
                {
                    path: "",
                    element: <DiscoverPage />,
                },
                {
                    path: "your-events",
                    element: (
                        <LoggedInRoute>
                            <MyEventsPage />
                        </LoggedInRoute>
                    ),
                },
                {
                    path: "discover",
                    element: <DiscoverPage />,
                },
            ],
        },
        {
            path: "/profile",
            element: (
                <LoggedInRoute>
                    <ProfilePage />
                </LoggedInRoute>
            ),
        },
        {
            path: "/event/:id",
            element: <EventPage />,
        },
        {
            path: "/tickets",
            element: (
                <LoggedInRoute>
                    <TicketsPage />
                </LoggedInRoute>
            ),
        },
    ]);
};

const Router = (): JSX.Element => {
    return (
        <BrowserRouter basename={config.publicUrl}>
            <ScrollToTop />
            <main className="sm:mx-auto flex w-full max-w-6xl flex-col items-start p-5">
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
