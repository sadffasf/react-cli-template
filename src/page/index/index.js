import React, { useRef, useEffect, useState, Component } from "react";
import { Button, Image, Spin } from "antd";
import { Outlet } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import store from "./store";
import { ethers } from "ethers";
import "./index.scss";

/*首页组件*/
const IndexCmp = () => {
  const curStore = useLocalObservable(() => store);
  const [curAccount, setCurAccount] = useState(null);
  const [curHeight, setCurHeight] = useState(0);
  const checkIsInstallWallet = (() => {
    //是否安装小狐狸
    const { ethereum } = window;
    if (ethereum) {
      console.log("检测到小狐狸钱包安装啦");
      return true;
    }
    return false;
  })();
  let timer = null;
  /*连接钱包功能*/
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("请安装小狐狸钱包");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setCurAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getEthHeight = async () => {
    /*获取Provider和签名者*/
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setInterval(async () => {
      const cHeight = await provider.getBlockNumber();
      setCurHeight(cHeight);
    }, 1000);
  };
  useEffect(() => {
    curStore.init();
    connectWallet();
    getEthHeight();
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="index-page-box">
      <div className="main-content">
        <div className="eth-message">
          <div>
            当前区块高度: <span style={{ color: "red" }}>{curHeight}</span>
            <div>当前钱包地址:{curAccount} </div>
          </div>

          {checkIsInstallWallet ? (
            <div>
              {curAccount ? (
                <Button shape="round" type="primary">
                  Mint NFT
                </Button>
              ) : (
                <button
                  className="gray-btn"
                  onClick={() => {
                    connectWallet();
                  }}
                >
                  连接钱包
                </button>
              )}
            </div>
          ) : (
            <div>未检测到小狐狸钱包</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(IndexCmp);
