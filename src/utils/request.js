import axios from "axios";
import { message } from "antd";

/*获取登录token,假设记录在localStorage里面*/
const getToken = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken;
};

//错误处理
const errorDeal = (status) => {
  let errMessage = "未知错误";
  switch (status) {
    case 400:
      errMessage = "错误的请求";
      break;
    case 401:
      errMessage = "未授权，请重新登录";
      message.error(errMessage);
      return;
      /*      window.location.href =
        "/login?redirectUrl=" + encodeURIComponent(window.location.href);*/
      break;
    case 403:
      errMessage = "拒绝访问";
      break;
    case 404:
      errMessage = "请求错误,未找到该资源";
      break;
    case 405:
      errMessage = "请求方法未允许";
      break;
    case 408:
      errMessage = "请求超时";
      break;
    case 500:
      errMessage = "服务器端出错";
      break;
    case 501:
      errMessage = "网络未实现";
      break;
    case 502:
      errMessage = "网络错误";
      break;
    case 503:
      errMessage = "服务不可用";
      break;
    case 504:
      errMessage = "网络超时";
      break;
    case 505:
      errMessage = "http版本不支持该请求";
      break;
    default:
      errMessage = `其他连接错误 --${status}`;
  }
  message.error(errMessage);
};

/*通用实例*/
const instance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {},
});

instance.interceptors.request.use((config) => {
  const authToken = getToken();
  if (authToken) {
    config.headers.authToken = authToken;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const { status, data, config } = response;
    if (status == 200) {
      return Promise.resolve(data);
    } else {
      Promise.reject();
    }
  },
  (error) => {
    const { status, data, config } = error.response;
    errorDeal(status);
    return Promise.reject(data);
  }
);

export default instance;
