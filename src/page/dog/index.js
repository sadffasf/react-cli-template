import React, { useRef, useEffect, useState } from "react";
import { Button, Image, Spin } from "antd";
import { observer, useLocalObservable } from "mobx-react";
import store from "./store";
import styles from "./index.module.scss";

/*狗组件*/
const Dog = () => {
  const curStore = useLocalObservable(() => store);
  return (
    <div className={styles["page-dog"]}>
      <div className={styles["btn-box"]}>
        <Button
          loading={curStore.loading}
          onClick={() => {
            curStore.otherDog();
          }}
        >
          下一只狗
        </Button>
      </div>
      <div className={styles["content-flex"]}>
        {curStore.loading ? (
          <Spin tip="数据正在请求中。。" />
        ) : (
          <Image
            width={500}
            placeholder={<Spin tip="图片正在加载中。。。"></Spin>}
            src={curStore.url}
          />
        )}
      </div>
    </div>
  );
};

export default observer(Dog);
