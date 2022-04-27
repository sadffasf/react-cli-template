import React, { useRef, useEffect, useState } from "react";
import styles from "./index.module.css";
import justifiedLayout from "justified-layout";
const JustifyLayout = ({ data = [], render = null }) => {
  const boxRef = useRef(null);
  const [layoutData, seLayoutData] = useState([]);
  useEffect(() => {
    if (data.length == 0) return;

    const containerWidth = boxRef.current.parentElement.clientWidth - 18;
    seLayoutData(
      justifiedLayout(
        data.map((item) => {
          return item.width / item.height;
        }),
        {
          containerPadding: 10,
          targetRowHeight: 160,
          containerWidth: containerWidth,
        }
      ).boxes
    );
  }, [data]);

  return (
    <div ref={boxRef} className={styles["layout-justify-box"]}>
      {layoutData.map((item, index) => {
        const style = {
          width: item.width + "px",
          height: item.height + "px",
          left: item.left + "px",
          top: item.top + "px",
        };

        return (
          <div
            className={styles["layout-justify-img-box"]}
            key={index}
            style={style}
          >
            {render(Object.assign(data[index], { layoutData: item }), index)}
          </div>
        );
      })}
    </div>
  );
};

export default JustifyLayout;
