import axios from "axios";

const instance = axios.create({
    baseURL:'',
    timeout:10,
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use((config)=>{
    /*处理携带 token*/
    return config
})

instance.interceptors.response.use((res)=>{
    /*
    * 统一错误信息处理,
    * 返回结构封装,
    * token失效跳转登录页面
    * */
    return res
})

const get= (url,config={})=>{
    /*返回一个promise*/
    return instance(
        {
            ...config,
            method:'get',
            url,
        }
    )
}

const post= (url,params,config)=>{
    /*返回一个promise*/
    return instance(
        {
            ...config,
            url,
            method:'post',
            data:params
        }
    )
}

export {
    get,
    post
}


