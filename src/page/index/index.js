import React, { useRef, useEffect, useState, Component } from "react";
import { Button, Image, Spin } from "antd";
import { Outlet } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import store from "./store";
import "./index.scss";
const ethers = window.ethers;
/*首页组件*/
const IndexCmp = () => {
  const curStore = useLocalObservable(() => store);
  useEffect(() => {
    curStore.init();
  }, []);
  return <div>首页</div>;
};

class MainCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockNumber: 0,
      myAddress: "",
    };
    console.clear();
    this.getEth();
  }
  //test Contact

  contactInit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });

    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const abi = [
      // Read-Only Functions
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",

      // Authenticated Functions
      "function transfer(address to, uint amount) returns (bool)",

      // Events
      "event Transfer(address indexed from, address indexed to, uint amount)",
    ];
    /*BNB地址*/
    const address = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    const erc20 = new ethers.Contract(address, abi, provider);
    const erc20_rw = new ethers.Contract(address, abi, signer);

    console.log("合约地址:", erc20.address);
    const myAddress = await signer.getAddress();
    console.log("我的地址:", myAddress);
    const wallet2Address = "0x8Fc61a4a25Fb7AC87599b3F5bccb2b2DE078D488";
    console.log(ethers.utils.parseUnits("1.31"));
    /*    const tx = await erc20_rw.transfer(
      wallet2Address,
      ethers.utils.parseUnits("1.31")
    );
    console.log(tx);*/
    const filterTo = erc20.filters.Transfer(null, signer.address);
  };

  signerInit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });

    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    console.log("signer地址是:", await signer.getAddress());
    const balance = await signer.getBalance();
    console.log("balance:", ethers.utils.formatUnits(balance, 18), "BNB");
    console.log(
      " this wallet is connected to chain ID:",
      await signer.getChainId()
    );

    console.log(
      "gas Now :",
      ethers.utils.formatUnits(await signer.getGasPrice(), "gwei")
    );
    console.log("交易了多少次:", await signer.getTransactionCount());
    //请求签名
    // await signer.signMessage( "\x19Ethereum Signed Message:\n fuck fuck fuck" ).catch(err=>console.log(err))
    const transactionRequest = {
      // Required unless deploying a contract (in which case omit)
      to: "0xfb93F545aD843f9FD8eAfE6fC2A0BCe09DAa1f1b", // the target address or ENS name
      from: "0x8Fc61a4a25Fb7AC87599b3F5bccb2b2DE078D488",
      // These are optional/meaningless for call and estimateGas
      // nonce: 0,           // the transaction nonce
      gasLimit: 1000, // the maximum gas this transaction may spend
      gasPrice: await signer.getGasPrice(), // the price (in wei) per unit of gas

      // These are always optional (but for call, data is usually specified)
      // data: "0x",         // extra data for the transaction, or input for call
      value: 0.001, // the amount (in wei) this transaction is sending
      chainId: 56, // the network ID; usually added by a signer
    };
    await signer
      .sendTransaction(transactionRequest)
      .catch((e) => console.log(e));
  };

  init = async () => {
    // const provider = ethers.getDefaultProvider("homestead", {
    //   infura: '7c3ce3cf325f435a80e5cb62f526fce0',
    // });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const resolver = await provider.getResolver("ricmoo.eth");
    console.log(await provider.getTransactionCount("ricmoo.eth"));
    console.log(
      "ETH:",
      await resolver.getAddress(),
      "BTC:",
      await resolver.getAddress(0)
    );
    console.log(await provider.getNetwork());
    const gasPrice = await provider.getGasPrice();
    // { BigNumber: "70159653159" }

    // ...often this gas price is easier to understand or
    // display to the user in gwei
    console.log(ethers.utils.formatUnits(gasPrice, "gwei"));

    // '70.159653159'
  };
  getBlockHeight = async () => {
    const height = await this.provider.getBlockNumber();
    this.setState(
      {
        blockNumber: height,
      },
      () => {
        this.getBlockHeight();
      }
    );
  };

  getEth = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    //  any允许切换钱包
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });

    // MetaMask requires requesting permission to connect users accounts
    this.provider.send("eth_requestAccounts", []);
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    this.signer = this.provider.getSigner();
    const myAddress = await this.signer.getAddress();
    this.setState({
      myAddress: myAddress,
    });
    this.getBlockHeight();
  };

  contract = async () => {
    //    合约地址
    const address = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
    const abi = [
      // Some details about the token
      "function name() view returns (string)",
      "function symbol() view returns (string)",

      // Get the account balance
      "function balanceOf(address) view returns (uint)",

      // Send some of your tokens to someone else
      "function transfer(address to, uint amount)",

      // An event triggered whenever anyone transfers to someone else
      "event Transfer(address indexed from, address indexed to, uint amount)",
    ];
    const contract = new ethers.Contract(address, abi, this.provider);
    this.contract = contract;
    console.log("合约信息", contract);
    const gasPrice = await this.signer.getGasPrice();
    console.log("the gas price:", ethers.utils.formatUnits(gasPrice, 18));
    // Get the ERC-20 token name
    const tokenName = await contract.name();

    // Get the ERC-20 token symbol (for tickers and UIs)
    const tokenSymbol = await contract.symbol();

    // Get the balance of an address
    const balance = await contract.balanceOf(this.state.myAddress);

    ethers.utils.formatUnits(balance, 18);

    console.log(
      "tokenName:",
      tokenName,
      "tokenSymbol:",
      tokenSymbol,
      "地址",
      this.state.myAddress,
      ":",
      ethers.utils.formatUnits(balance, 18)
    );
    contract.on("Transfer", (from, to, amount, event) => {
      console.log(`${from} sent ${ethers.utils.formatEther(amount)} to ${to}`);
      // The event object contains the verbatim log data, the
      // EventFragment and functions to fetch the block,
      // transaction and receipt and event functions
    });
  };

  render() {
    return (
      <div>
        {this.state.myAddress == "" ? (
          <button
            className="graybtn"
            onClick={() => {
              this.getEth();
            }}
          >
            连接钱包
          </button>
        ) : (
          <div style={{ padding: "20px" }}>
            <div>钱包地址:{this.state.myAddress}</div>
            <div>当前区块高度:{this.state.blockNumber}</div>
          </div>
        )}
        <Outlet />
      </div>
    );
  }
}

export default observer(IndexCmp);
