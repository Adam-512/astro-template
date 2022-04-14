import "preact/debug";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Component } from "preact";
import { WalletProvider } from "./walletContext";
import ConnectTestBtn from "./ConnectTestBtn.jsx";

export class WalletConnect extends Component {
  web3Modal;
  provider;
  signer;
  instance;
  state = { address: "" };
  constructor() {
    super();
    this.init();
  }
  init() {
    const address = window.ethereum?.selectedAddress;
    if (address) {
      this.setState({ address });
      this.connect();
    }

    console.log("wallet init");
  }

  async connect() {
    if (this.instance) {
      return;
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
    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    this.instance = await this.web3Modal.connect();
    this.setState({ address: this.instance.selectedAddress });

    this.provider = new ethers.providers.Web3Provider(this.instance);
    this.signer = this.provider.getSigner();

    let networkId = await this.signer.getChainId();
    console.log(networkId);

    this.listener();
    console.log("wallet do connect");
  }

  listener() {
    const handler = (accounts) => {
      console.log(accounts);
      this.setState({ address: accounts[0] });
      if (accounts.length == 0) {
        this.instance.removeListener("accountsChanged", handler);
        this.instance = null;
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
      }
    };
    this.instance.on("accountsChanged", handler);

    // Subscribe to chainId change
    this.instance.on("chainChanged", (chainId) => {
      window.location.reload();
    });
  }

  render() {
    return (
      <WalletProvider value={[this.state.address, this.connect.bind(this)]}>
        <ConnectTestBtn />
      </WalletProvider>
    );
  }
}
