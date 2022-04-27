import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import "./index.scss";
export default class extends Component {
  render() {
    return (
      <div>
        <button className="graybtn">首页</button>
        <Outlet />
      </div>
    );
  }
}
