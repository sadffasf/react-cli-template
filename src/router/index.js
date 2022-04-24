import React,{lazy,Suspense} from 'react';
import {Routes,Route,Navigate ,Outlet} from 'react-router-dom';

const Index = lazy(()=>import('src/page/index'));
const Cat = lazy(()=>import('src/page/cat'));
const Dog = lazy(()=>import('src/page/dog'));



const routes = [
    {
        path:'',
        element: <Navigate to="/index" />
    },
    {
        path:'/index',
        element:<Index /> ,
        children:[
            {
                index:true,
                element: <Cat />
            },
            {
                path:'cat',
                element: <Cat />
            },
            {
                path:'dog',
                element: <Dog />
            },
        ]
    },
    {
        path:'*',
        element: <div>404页面</div>,
    }
];

/*路由*/
const renderRoute = (route,index)=>{
    if(!route.children){
        return <Route key={index} path={route.path} index={!!route.index} element={<Suspense fallback={<div>加载中..</div>}>{route.element}</Suspense>}></Route>
    }else{
        return (
            <Route key={index} path={route.path}  element={<Suspense fallback={<div>加载中..</div>}>{route.element}</Suspense>}>
                {
                    route.children.map(renderRoute)
                }
            </Route>
        )
    }
};

const AppRoutes = ()=>{
    return (<Routes>
        {routes.map(renderRoute)}
    </Routes>)
}

export default AppRoutes

