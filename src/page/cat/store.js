import { observable, action, makeObservable } from "mobx";
import myFetch from "src/service/fetch";
class Store {
  constructor() {
    makeObservable(this);
    this.getCatPhotos();
  }

  @observable dataList = [];
  @action getList() {
    return myFetch("https://api.thecatapi.com/v1/images/search?limit=30");
  }
  @action getCatPhotos() {
    this.getList().then((res) => {
      this.dataList = res;
    });
  }
}
export default new Store();
