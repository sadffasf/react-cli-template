import { observable, action, makeObservable } from "mobx";
import Web3 from "web3";
window.Web3 = Web3;
window.web3 = new Web3(window.web3.currentProvider);
const web3 = window.web3;
class IndexStore {
  @observable list = [];
  @action async init() {
    console.clear();
  }
  constructor() {
    /*高版本mobx必须*/
    makeObservable(this);
  }
}
export default new IndexStore();
