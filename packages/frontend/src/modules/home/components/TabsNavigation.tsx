import { Link, useLocation } from "react-router-dom";
import { cn } from "utils";

export default function TabsNavigation({ className }: React.HTMLAttributes<HTMLElement>) {
    const location = useLocation();

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}>
            <Link
                to="/discover"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === "/discover" || location.pathname === "/" ? "text-primary font-semibold" : "text-muted-foreground",
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
        </nav>
    );
}
