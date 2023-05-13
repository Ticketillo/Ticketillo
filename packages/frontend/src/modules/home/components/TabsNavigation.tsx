import CreateEventModal from "modules/event/components/CreateEventModal/CreateEventModal";
import { Link, useLocation } from "react-router-dom";
import { cn } from "utils";
import { useAuthState } from "modules/auth/state";

export default function TabsNavigation({ className }: React.HTMLAttributes<HTMLElement>) {
    const location = useLocation();
    const { isLoggedIn } = useAuthState();

    return (
        <nav className={cn("flex flex-row w-full items-center justify-between space-x-4 lg:space-x-6 ", className)}>
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-row gap-6">
                    <Link
                        to="/discover"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            location.pathname === "/discover" || location.pathname === "/"
                                ? "text-primary font-semibold"
                                : "text-muted-foreground",
                        )}
                    >
                        Discover
                    </Link>
                    <Link
                        to="/your-events"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            location.pathname === "/your-events" ? "text-primary font-semibold" : "text-muted-foreground",
                        )}
                    >
                        Your events
                    </Link>
                </div>
                <CreateEventModal />
            </div>
        </nav>
    );
}
