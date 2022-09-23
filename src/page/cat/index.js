import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Image } from "antd";
import JustifyLayout from "src/component/JustifyLayout";
import store from "./store";
import { observer, useLocalObservable } from "mobx-react";

const Cats = () => {
  const curStore = useLocalObservable(() => store);
  return (
    <div className={styles["cat-page"]}>
      <div>
        <button
          className={`gray-btn ${styles.others}`}
          onClick={() => {
            curStore.getCatPhotos();
          }}
        >
          换一批
        </button>
      </div>

      <div id="catContainer" style={{ flex: "1" }}>
        <JustifyLayout
          data={curStore.dataList}
          render={(item, index) => {
            return (
              <Image
                key={index}
                src={item.url}
                data-src={item.url}
                preview={true}
                className="lazyload"
                placeholder={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#ddd",
                    }}
                  ></div>
                }
                width="100%"
                height="100%"
                alt=""
              />
            );
          }}
        ></JustifyLayout>
      </div>
    </div>
  );
};

export default observer(Cats);
