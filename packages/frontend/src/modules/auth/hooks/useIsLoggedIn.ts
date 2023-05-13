import { useAuthState } from "../state";

export default function useIsLoggedIn() {
    const { isLoggedIn } = useAuthState();

    return isLoggedIn;
}
