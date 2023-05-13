import { useAuthState } from "modules/auth/state";

import { Button } from "components/button";

export default function UserMenu() {
    const { isLoggedIn } = useAuthState();

    return <div>{isLoggedIn ? <p>dalksdja</p> : <Button>Login</Button>}</div>;
}
