import { reactive } from "vue";
import Web3Modal from "web3modal";
import {ethers} from 'ethers/dist/ethers.esm'
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js';

export class WalletInit {
    static instance;
    wallet;
    provider;
    signer;
    data = reactive({
        address: ''
    })
    constructor() {
        if (!WalletInit.instance) {
            const address = window.ethereum?.selectedAddress;
            if (address) {
                this.data.address = address
                this.connect();
            }
            WalletInit.instance = this;
            return this;
        }
        return WalletInit.instance;
    }
    async connect() {
        if (this.wallet) {
            return
        }
        const providerOptions = {
            /* See Provider Options Section */
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: "INFURA_ID", // required
                },
            },
        };
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions,
        });


        this.wallet = await web3Modal.connect();
        this.data.address = this.wallet.selectedAddress

        this.provider = new ethers.providers.Web3Provider(this.wallet);
        this.signer = this.provider.getSigner();

        this.networkId = await this.signer.getChainId();

        this.listener();
        console.log("wallet do connect");
    }
    listener() {
        const handler = (accounts) => {
            console.log(accounts);
            this.data.address = accounts[0]
            if (accounts.length == 0) {
                this.wallet.removeListener("accountsChanged", handler);
                this.wallet = null;
                localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
            }
        };
        this.wallet.on("accountsChanged", handler);

        // Subscribe to chainId change
        this.wallet.on("chainChanged", (chainId) => {
            window.location.reload();
        });
    }
}