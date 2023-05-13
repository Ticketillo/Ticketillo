import { Web3ProviderService } from "../services/web3/Web3ProviderService";
import { useEffect, useState } from "react";
import { authState } from "../modules/auth/state";

export default function useLoad() {
    const [loading, setloading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const { address } = await Web3ProviderService.connect();
                authState.setState({
                    address,
                    isLoggedIn: true,
                });
                setloading(false);
            } catch (e) {
                console.error(e);
                setloading(false);
            }
        })();
    });
    return loading;
}
