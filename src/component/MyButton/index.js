import React from "react";
import "./index.css";
const MyButton = (props) => {
  return (
    <button className="gray-btn" {...props}>
      {props.children}
    </button>
  );
};
export default MyButton;
