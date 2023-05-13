import { Button } from "components/button";
import { Web3ProviderService } from "../../../services/web3/Web3ProviderService";
import { authState, useAuthState } from "../../auth/state";

export default function UserAuthForm() {
    const onClick = async () => {
        try {
            await Web3ProviderService.connect();
            const account = await Web3ProviderService.getConnectedAccount()
            console.log(account);
            authState.setState(() => ({
                isLoggedIn: true,
                address: account.address,
            }))
        } catch (e) {
            console.log(e);
        }
    }

    return <Button onClick={() => onClick()}>Login with MetaMask</Button>;
}
