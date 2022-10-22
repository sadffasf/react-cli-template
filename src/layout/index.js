import { Layout, Menu } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import React from "react";
import PageRoutes from "src/router";
import Login from 'src/page/login'

const { Header, Content } = Layout;
const LayoutApp = () => {
  let location = useLocation();
  const navList = [
    {
      key: "index",
      path: "/index",
      text: "Home",
    },
    {
      key: "cat",
      path: "/cat",
      text: "Cat",
    },
    {
      key: "dog",
      path: "/dog",
      text: "Dog",
    },
    {
      key: "contributor",
      path: "/contributor",
      text: "创作者中心",
    },
  ];
  const path = location.pathname.slice(1);
  if(path=='login') return  <Login />
  return (
    <Layout className="layout-app">
      {/*头部*/}
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[path]}>
          {navList.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <NavLink to={item.path}>{item.text}</NavLink>
              </Menu.Item>
            );
          })}
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

export default observer(LayoutApp);
