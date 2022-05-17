import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "antd";
import "./index.scss";
import { get } from "src/service/axios";
import axios from "axios";

const ethers = window.ethers;
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockNumber: 0,
      myAddress: "",
    };
    this.getEth();
  }
  getEth = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    this.provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    this.provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    this.signer = this.provider.getSigner();
    console.log("signer", this.signer);
    const height = await this.provider.getBlockNumber();
    this.setState({
      blockNumber: height,
    });
    const balance = await this.provider.getBalance("ethers.eth");

    console.log("balance", ethers.utils.formatEther(balance));
    const myAddress = await this.signer.getAddress();
    this.setState({
      myAddress: myAddress,
    });
    this.lunaContract();
  };

  lunaContract = async () => {
    //    luna的bsc地址，兼容eth的evm
    const daiAddress = "dai.tokens.ethers.eth";
    const daiAbi = [
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
    const daiContract = new ethers.Contract(daiAddress, daiAbi, this.provider);
    this.daiContract = daiContract;
    console.log("dai合约", daiContract);
    const gasPrice = await this.signer.getGasPrice();
    console.log("the gas price:", ethers.utils.formatUnits(gasPrice, 18));
    // Get the ERC-20 token name
    const tokenName = await daiContract.name();
    // 'Dai Stablecoin'

    // Get the ERC-20 token symbol (for tickers and UIs)
    const tokenSymbol = await daiContract.symbol();
    // 'DAI'

    // Get the balance of an address
    const balance = await daiContract.balanceOf(this.state.myAddress);

    // { BigNumber: "35192070455884268201631" }

    // Format the DAI for displaying to the user
    ethers.utils.formatUnits(balance, 18);

    console.log(
      tokenName,
      tokenSymbol,
      this.state.myAddress,
      ":",
      ethers.utils.formatUnits(balance, 18)
    );
    daiContract.on("Transfer", (from, to, amount, event) => {
      console.log(`${from} sent ${ethers.utils.formatEther(amount)} to ${to}`);
      // The event object contains the verbatim log data, the
      // EventFragment and functions to fetch the block,
      // transaction and receipt and event functions
    });
  };

  sendEth = async () => {
    return;
    const daiWithSigner = this.daiContract.connect(this.signer);
    const dai = ethers.utils.parseUnits("1.0", 18);
    const tx = daiWithSigner.transfer("ricmoo.firefly.eth", dai);
  };

  getLunaData = async () => {};

  render() {
    return (
      <div>
        <button
          className="graybtn"
          onClick={() => {
            this.getEth();
          }}
        >
          连接钱包
        </button>
        <button
          className="graybtn"
          onClick={() => {
            this.sendEth();
          }}
        >
          发送eth
        </button>

        <Button
          onClick={() => {
            this.getLunaData();
          }}
        >
          Luna数组获取
        </Button>

        <div style={{ padding: "20px" }}>
          <div>钱包地址:{this.state.myAddress}</div>
          <div>当前区块高度:{this.state.blockNumber}</div>
        </div>
        <Outlet />
      </div>
    );
  }
}
