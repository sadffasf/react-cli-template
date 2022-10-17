import React, { useRef, useEffect, useState } from "react";
import { Button, Image, Spin, Input, Space } from "antd";
import { observer, useLocalObservable } from "mobx-react";
import store from "./store";
// import styles from "./index.module.scss";

/*创作者中心组件*/
const Main = () => {
  const curStore = useLocalObservable(() => store);
  return (
    <div>
      <Space>
        <Input
          placeholder="请输入用户Id"
          value={curStore.id}
          onChange={(e) => {
            const value = e.target.value;
            curStore.id = value;
          }}
        ></Input>
        <Button
          loading={curStore.loading}
          onClick={() => {
            curStore.axiosLogin();
            // curStore.login();
          }}
        >
          {curStore.loading ? "登录中.." : "登录"}
        </Button>
      </Space>
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
