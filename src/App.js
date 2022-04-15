import logo from "./logo.svg";
import {lazy,Suspense  } from 'react'
import 'antd/dist/antd.css';
import "./App.css";
import {Layout, Menu,Spin } from 'antd';
import {BrowserRouter, Route, Routes, Outlet, Link } from "react-router-dom";

const  PageIndex = lazy(()=>import('./page/index') )
const  PageCat = lazy(()=>import('./page/cat') )
const  PageDog = lazy(()=>import('./page/dog') )
const {Header, Content} = Layout;


const LayoutApp = () => {
    return (
        <BrowserRouter>
            <Layout className="layout-app">
                {/*头部*/}
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to='/'>首页</Link> </Menu.Item>
                        <Menu.Item key="2"><Link to='/cat'>Cat</Link> </Menu.Item>
                        <Menu.Item key="3"><Link to='/dog'>Dog</Link></Menu.Item>
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
                    <div style={{flex: 1, width: '100%', height: '100%', overflow: 'auto'}}>

                        <Routes>
                            <Route path='/' element={<div>
                                <div>来自home组件的信息，永远不会变的</div>
                                <Outlet/>
                            </div>}>
                                <Route index element={ <Suspense fallback={<Spin /> }><PageIndex/></Suspense>      }></Route>
                                <Route path='cat' element={ <Suspense fallback={<Spin /> }><PageCat/></Suspense> }></Route>
                                <Route path='dog' element={ <Suspense fallback={<Spin /> }><PageDog/></Suspense>}></Route>
                                <Route
                                    path="*"
                                    element={
                                        <main style={{padding: "1rem"}}>
                                            <p>404~</p>
                                        </main>
                                    }
                                />
                            </Route>
                        </Routes>

                    </div>
                </Content>
            </Layout>
        </BrowserRouter>
    )
}


export default LayoutApp;
