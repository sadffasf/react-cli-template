import React, { useRef, useEffect, useState } from "react";
import { Button, Image, Spin, Input, Space } from "antd";
import { observer, useLocalObservable } from "mobx-react";
import store from "./store";
// import styles from "./index.module.scss";

/*登录组件*/
const Main = () => {
  const curStore = useLocalObservable(() => store);
  return (
    <div style={{ width: "200px" }}>
      <div>
        <Input
          placeholder="请输入用户Id"
          value={curStore.userName}
          onChange={(e) => {
            const value = e.target.value;
            curStore.userName = value;
          }}
        ></Input>
      </div>
      <div>
        <Input
          placeholder="请输入密码"
          value={curStore.password}
          onChange={(e) => {
            const value = e.target.value;
            curStore.password = value;
          }}
        ></Input>
      </div>
      <Button
        // loading={curStore.loading}
        onClick={() => {
          curStore.login();
        }}
      >
        {curStore.loading ? "登录中.." : "登录"}
      </Button>
      <div>
        {curStore.hasLogin && (
          <span>
            欢迎 <span style={{ color: "red" }}>{curStore.userInfo.name}</span>
            ~~~，登录成功~
          </span>
        )}
      </div>
    </div>
  );
};

export default observer(Main);
