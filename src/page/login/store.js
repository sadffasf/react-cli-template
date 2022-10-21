import { observable, action, makeObservable } from "mobx";
import { getUserInfo } from "src/api";
import { message } from "antd";
import http from "src/utils/request";

class LoginStore {
  @observable userName = ""; //用户名
  @observable password = ""; //密码
  @observable loading = false;
  @observable hasLogin = false;
  @observable userInfo = {}; //用户信息
  @action login() {
    this.loading = true;
    http
      .post("/apis/login", {
        userName: this.userName,
        password: this.password,
      })
      .then((res) => {
        if (res.d) {
          localStorage.setItem("authToken", res.d);
          this.hasLogin = true;
          this.getList();
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
  @action getList() {
    http.get("/apis/list").then((res) => {
      if (res.d) {
        message.info("成功了", res.d);
      } else {
        message.warn("失败了");
      }
    });
  }
  constructor() {
    /*高版本mobx必须*/
    makeObservable(this);
    this.getList();
  }
}
export default new LoginStore();
