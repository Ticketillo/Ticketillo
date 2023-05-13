import { ethers } from "ethers";


export class Web3ProviderService {
    private static readonly metamaskConnector = new MetaMaskConnector();
    private static readonly magicConnector = new MagicConnector({
        chain: this.chain,
        options: { apiKey: process.env.REACT_APP_MAGIC_LINK_API_KEY! },
    });

    static get provider(): Promise<ethers.BrowserProvider> {
        if ((window as any).ethereum) {
            return new ethers.BrowserProvider((window as any).ethereum, "any");
        }
        throw new Error("METAMASK_NOT_INSTALLED");
    }

    static async getConnectedAccount(): Promise<{ address: string; chain: number } | void> {
        try {
            const address = await this.wagmiService.getAccount();
            const chain = await this.wagmiService.getChainId();
            return {
                address: address,
                chain: chain,
            };
        } catch (e) {}
    }

    static async connect(): Promise<{ address: string; chain: number }> {
        try {
            const data = await this.wagmiService.connect({ connector: this.metamaskConnector });
            return {
                address: data.account,
                chain: data.chain.id,
            };
        } catch (e) {
            if ((e as Error).message === "MetaMask is not ready") throw new Error(translate("METAMASK_NOT_INSTALLED"));
            else throw new Error(translate("USER_REJECTED_METAMASK"));
        }
    }

    static async autoConnect(): Promise<{ address: string | undefined; chain: number | undefined }> {
        const data = await this.wagmiService.autoConnect();
        return {
            address: data?.account,
            chain: data?.chain.id,
        };
    }

    static async disconnect(): Promise<void> {
        return this.wagmiService.disconnect();
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
