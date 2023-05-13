import { ethers } from "ethers";

export class Web3ProviderService {
    static get provider(): ethers.providers.Web3Provider {
        if ((window as any).ethereum) {
            return new ethers.providers.Web3Provider((window as any).ethereum, "any");
        }
        throw new Error("METAMASK_NOT_INSTALLED");
    }

    static async getConnectedAccount(): Promise<{ address: string }> {
        const ethereum = (window as any).ethereum;

        if (ethereum) {
            const provider = this.provider;
            const signer = await provider.getSigner();
            try {
                return {
                    address: await signer.getAddress(),
                };
            } catch (e) {
                console.log(e);
            }
        }
        throw new Error("METAMASK_NOT_INSTALLED");
    }

    static async connect(): Promise<{ address: string }> {
        const ethereum = (window as any).ethereum;

        if (ethereum) {
            try {
                const provider = this.provider;
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                return {
                    address: await signer.getAddress(),
                };
            } catch (e) {
                throw new Error("USER_REJECTED_METAMASK");
            }
        }
        throw new Error("METAMASK_NOT_INSTALLED");
    }

    static addOnAccountChangeListener(callback: (accounts: string[]) => void): void {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            ethereum.on("accountsChanged", callback);
        }
    }

    static addOnChainChangeListener(callback: (chainId: string) => void): void {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            ethereum.on("chainChanged", callback);
        }
    }

    static removeOnAccountChangeListener(callback: (accounts: string[]) => void): void {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            ethereum.removeListener("accountsChanged", callback);
        }
    }

    static removeOnChainChangeListener(callback: (chainId: string) => void): void {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            ethereum.removeListener("chainChanged", callback);
        }
    }
}
