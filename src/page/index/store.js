import { observable, action, makeObservable } from "mobx";

class IndexStore {
  @observable list = [];
  @action async init() {}
  constructor() {
    /*高版本mobx必须*/
    makeObservable(this);
  }
}
export default new IndexStore();
