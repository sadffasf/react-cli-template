import {useEffect, useState} from 'react';
import logo from "./logo.svg";
import 'antd/dist/antd.css';
import "./App.css";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const hotPhotoList = () => {
  return  fetch("/api/photos", {
    method: "get",
  })
};

const getCatPhotos = ()=>{
  return  fetch('https://api.thecatapi.com/v1/images/search?limit=10').then((response)=>{return response.json()})
}

const Cats = (props)=>{
  const [catList,setCatList] = useState([]);
  useEffect(()=>{
    getCatPhotos().then(data=>{
      setCatList(data);
    })

  },[])
  return (<div>
    <div>
      <button onClick={()=>{
        setCatList([]);
        getCatPhotos().then(data=>{
          setCatList(data);
        })
      }}

      >换一批</button>
    </div>

  <div>
    {
      catList.map((item,index)=>{
        return <div style={{margin:'10px'}}><img className="cat-item"  key={index} src={item.url} alt=""/></div>
      })
    }
  </div>
  </div>)
}


const LayoutApp = ()=>{
  return (
      <Layout className="layout-app">
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
            >
              <div style={{flex:1,width:'100%',height:'100%',overflow:'auto'}}>
                <Cats />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
  )
}
function App() {
  return  <LayoutApp></LayoutApp>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
