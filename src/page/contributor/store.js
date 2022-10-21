import { observable, action, makeObservable } from "mobx";
import { getUserInfo } from "src/api";

class ContributorStore {
  @observable list = [];
  @observable id = ""; //用户id
  @observable userInfo = {}; //用户信息
  @observable url = null;
  @observable loading = false;
  @observable hasLogin = false;
  @action getUserInfo() {
    this.axiosLogin();
  }
  @action axiosLogin() {
    getUserInfo({
      headers: {
        testUserId: this.id,
      },
      loading: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @action login() {
    this.loading = true;
    const headers = new Headers();
    headers.append("Accept", "application/json");
    // 'beaff7355f6340ba812f271b7a292ad1'
    headers.append("testUserId", this.id);
    const request = new Request(`/api/cUser/getCUserInfo/1`, {
      headers: headers,
    });
    const _this = this;
    fetch(request)
      .then((response) => response.json())
      .then((res) => {
        this.userInfo = {
          ...res.data,
          ...res.data.cuser,
        };
        this.hasLogin = true;
        console.log(res);
      })
      .finally(() => {
        this.loading = false;
      });

    // myFetch("https://dog.ceo/api/breeds/image/random")
    //   .then((res) => {
    //     this.url = res.message;
    //   })
    //   .finally(() => (this.loading = false));
  }
  constructor() {
    /*高版本mobx必须*/
    makeObservable(this);
    this.getUserInfo();
  }
}
export default new ContributorStore();
