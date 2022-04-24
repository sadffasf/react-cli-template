import 'antd/dist/antd.css';
import "./App.css";
import {Layout, Menu} from 'antd';
import {BrowserRouter as Router, Link,useRoutes} from 'react-router-dom';
import PageRoutes from "./router";
import React, {useEffect, useState} from "react";
import myFetch from "./service/fetch";


const {Header, Content} = Layout;
const DailyWord = () => {
    const [data, setData] = useState({})
    useEffect(() => {
        myFetch('https://saying.api.azwcl.com/saying/get').then(data => {
            setData(data.data);
        })
    }, [])
    return <div>{data.content} ——<span>{data.author}</span></div>
}




const LayoutApp = () => {
    return (
        <Router>
            <Layout className="layout-app">
                {/*头部*/}
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to='/'>首页</Link> </Menu.Item>
                        <Menu.Item key="2"><Link to='/index/cat'>Cat</Link> </Menu.Item>
                        <Menu.Item key="3"><Link to='/index/dog'>Dog</Link></Menu.Item>
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
                    <DailyWord></DailyWord>
                    <div style={{flex: 1, width: '100%', height: '100%', overflow: 'auto'}}>
                        <PageRoutes />
                    </div>
                </Content>
            </Layout>
        </Router>
    )
}


export default LayoutApp;
