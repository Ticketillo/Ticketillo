import { Outlet } from "react-router-dom";

import TabsNavigation from "../components/TabsNavigation";
import DashboardStats from "../components/DashboardStats";

export default function HomePage() {
    return (
        <div className="w-full flex flex-col">
            <DashboardStats />

            <TabsNavigation className="py-10" />

            <Outlet />
        </div>
    );
}
