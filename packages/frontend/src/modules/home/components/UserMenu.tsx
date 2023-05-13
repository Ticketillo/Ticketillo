import { useAuthState } from "modules/auth/state";

import UserAuthForm from "./UserAuthForm";
import UserMenuDropdown from "./UserMenuDropdown";

export default function UserMenu() {
    const { isLoggedIn } = useAuthState();

    return <div>{isLoggedIn ? <UserMenuDropdown /> : <UserAuthForm />}</div>;
}
