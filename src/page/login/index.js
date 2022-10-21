import React, { useRef, useEffect, useState } from "react";
import { Button, Image, Spin, Input, Space } from "antd";
import { observer, useLocalObservable } from "mobx-react";
import store from "./store";
import styles from "./index.module.scss";

/*登录组件*/
const Main = () => {
  const curStore = useLocalObservable(() => store);
  return (
    <div  className={styles['page-login']}>
        <div>
            <div className={styles['wave']}></div>
            <div className={styles['wave']}></div>
            <div className={styles['wave']}></div>
        </div>
        <div className={styles['login-box']}>
          <Space direction="vertical" size={[22]}  split={<div style={{height:'20px'}}></div>}>
                <Input
                    style={{width:'100%'}}
                    bordered={false}
                  placeholder="请输入用户Id"
                  value={curStore.userName}
                  onChange={(e) => {
                    const value = e.target.value;
                    curStore.userName = value;
                  }}
                ></Input>
                <Input
                    style={{width:'100%'}}
                    bordered={false}
                  placeholder="请输入密码"
                  value={curStore.password}
                  onChange={(e) => {
                    const value = e.target.value;
                    curStore.password = value;
                  }}
                ></Input>

              <Button
                  block
                  type="primary"
                  ghost
                  shape="round"
                loading={curStore.loading}
                onClick={() => {
                  curStore.login();
                }}
              >
                {curStore.loading ? "登录中.." : "登录"}
              </Button>
          </Space>
        </div>
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
