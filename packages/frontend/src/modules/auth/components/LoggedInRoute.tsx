import { PropsWithChildren } from "react";
import ProtectedRoute from "router/components/ProtectedRoute/ProtectedRoute";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const LoggedInRoute = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const isLoggedIn = useIsLoggedIn();

    return (
        <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/">
            {children}
        </ProtectedRoute>
    );
};

export default LoggedInRoute;
