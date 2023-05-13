import { Link, useLocation } from "react-router-dom";
import { cn } from "utils";
import { useAuthState } from "modules/auth/state";

export default function TabsNavigation({ className }: React.HTMLAttributes<HTMLElement>) {
    const location = useLocation();
    const { isLoggedIn } = useAuthState();

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}>
            <Link
                to="/discover"
                className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    location.pathname === "/discover" || location.pathname === "/" ? "text-primary font-semibold" : "text-muted-foreground",
                )}
            >
                Discover
            </Link>
            {isLoggedIn && (
                <Link
                    to="/your-events"
                    className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        location.pathname === "/your-events" ? "text-primary font-semibold" : "text-muted-foreground",
                    )}
                >
                    Your events
                </Link>
            )}
        </nav>
    );
}
