import {observable, action, makeObservable} from 'mobx';
import myFetch from "src/service/fetch";
class DogStore {
    @observable list = [];
    @observable name='自定义dog';
    @observable url=null;
    @observable loading=false;
    @action otherDog(){
        this.getRandomDog()
    }
    @action getRandomDog(){
        this.loading = true;
        myFetch('https://dog.ceo/api/breeds/image/random').then(res=>{
            this.url = res.message;
        }).finally(()=> this.loading = false)
    }
    constructor() {
        /*高版本mobx必须*/
        makeObservable(this);
        this.getRandomDog();
    }
};
export default new DogStore()