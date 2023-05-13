import { RouteObject } from "react-router-dom";
import EventScreen from "./pages/EventScreen";

export const eventRouter: RouteObject[] = [
    {
        path: "/event/:id",
        element: <EventScreen />,
    },
];
