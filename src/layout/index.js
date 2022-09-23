import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import PageRoutes from "src/router";
const { Header, Content } = Layout;

const LayoutApp = () => {
  return (
    <Layout className="layout-app">
      {/*头部*/}
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/cat">Cat</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/dog">Dog</Link>
          </Menu.Item>
        </Menu>
      </Header>
      {/*内容区*/}
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div
          style={{ flex: 1, width: "100%", height: "100%", overflow: "auto" }}
        >
          <PageRoutes />
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutApp;
