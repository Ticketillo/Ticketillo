import TabsNavigation from "../components/TabsNavigation";
import { Outlet } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="w-full flex flex-col">
            {/* {isLoggedIn && <DashboardStats />} */}

            <TabsNavigation className="py-10" />

            <Outlet />
        </div>
    );
}
