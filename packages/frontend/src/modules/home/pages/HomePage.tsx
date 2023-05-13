import { useAuthState } from "modules/auth/state";
import DashboardStats from "../components/DashboardStats";
import TabsNavigation from "../components/TabsNavigation";
import { Outlet } from "react-router-dom";

export default function HomePage() {
    const { isLoggedIn } = useAuthState();

    const fakeLogged = true;

    return (
        <div className="w-full flex flex-col">
            {fakeLogged && <DashboardStats />}

            <TabsNavigation className="py-10" />

            <Outlet />
        </div>
    );
}
