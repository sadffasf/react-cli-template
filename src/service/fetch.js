
const myFetch =(url,config)=>{
   return  fetch(url,Object.assign({method:'get'},config)).then(res=> res.json());
}
export default myFetch
