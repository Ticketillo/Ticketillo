import { ethers } from "ethers";


export class Web3ProviderService {
    static get provider(): ethers.BrowserProvider {
        if ((window as any).ethereum) {
            return new ethers.BrowserProvider((window as any).ethereum, "any");
        }
        throw new Error("METAMASK_NOT_INSTALLED");
    }

    static async getConnectedAccount(): Promise<{ address: string; chain: bigint }> {
        const ethereum = (window as any).ethereum;

        if (ethereum) {
            const provider = this.provider;
            const signer = await provider.getSigner();
            try {
                return {
                    address: await signer.getAddress(),
                    chain: (await provider.getNetwork()).chainId,
                };
            } catch (e) {}
        }
        throw new Error("METAMASK_NOT_INSTALLED");
    }

    static async connect(): Promise<{ address: string; chain: bigint }> {
        const ethereum = (window as any).ethereum;

        if (ethereum) {
            try {
                const provider = this.provider;
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const network = await provider.getNetwork();
                return {
                    address: await signer.getAddress(),
                    chain: network.chainId,
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
