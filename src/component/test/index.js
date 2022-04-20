import React,{useEffect, useState} from "react";
import './test.css';
import justifiedLayout from 'justified-layout';
import {defaultImgSrc} from 'src/constants'
import {Image,Button} from "antd";
import log from "tailwindcss/src/util/log";


const JustifyLayout = (props)=>{
    const layoutData = justifiedLayout(props.data.map(item=>{return item.width/item.height}),{
        containerPadding:10,
        targetRowHeight:160,
        containerWidth: document.body.clientWidth-100
    }).boxes;
/*    let newChildren = [];
    React.Children.forEach(props.children,(item,index)=>{
        item = Object.assign(item,layoutData[index])
        newChildren.push(item)
    })*/

        return <div>
            {
                layoutData.map((item,index)=>{
                    const style={
                        position:'absolute',
                        width:item.width+'px',
                        height:item.height+'px',
                        left:item.left+'px',
                        top:item.top+'px'
                    }

                    return <div key={index} style={style}>
                        {props.Item(props.data[index],index)}
                    </div>
                })
            }
        </div>


}

export const Cats = (props)=>{
    const [catList,setCatList] = useState([]);


    const getCatPhotos = ()=>{
       return fetch('https://api.thecatapi.com/v1/images/search?limit=30').then((response)=>{return response.json()})
    }


    /*换一批*/

    const getOtherCats = ()=>{
        setCatList([]);
        getCatPhotos().then(data=>{
            setCatList(data);
        })
    }



    /*加载更多*/
    const loadMore = ()=>{
        getCatPhotos().then(data=>{
            let arr = [...catList,...data];
            setCatList(arr);
        })
    }


    const lazyLoadImg = ()=>{
        setTimeout(()=>{
            const imgs = document.querySelectorAll("img.lazyload");
            const observer = new IntersectionObserver(nodes => {
                nodes.forEach(v => {
                    if (v.isIntersecting) { // 判断是否进入可视区域
                        v.target.src = v.target.parentNode.dataset.src; // 赋值加载图片
                        observer.unobserve(v.target); // 停止监听已加载的图片
                    }
                });
            });
            imgs.forEach(v => observer.observe(v));
        },300)

    }

    useEffect(()=>{
/*        const bottom = document.getElementById("catBottom");
        const observer = new IntersectionObserver(nodes => {
            const tgt = nodes[0]; // 反正只有一个
            if (tgt.isIntersecting) {
                // 执行接口请求代码
                alert("加载更多")
                loadMore();
            }
        })
        observer.observe(bottom);*/
        getOtherCats();

    },[])

    return (<div>
        <div>
            <Button type="primary" onClick={()=>{
                getOtherCats()
            }}
            >换一批</Button>
        </div>
        <div id="catContainer" style={{position:'relative',width:'100%'}}>
            <JustifyLayout data={catList} Item={(item,index)=>{return <Image key={index} src={item.url} data-src={item.url} preview={false} className="lazyload" placeholder={<div style={{width:'100%',height:'100%',background:"#ddd"}}></div>} width="100%" height="100%"  alt=""/>}}></JustifyLayout>
        </div>
    </div>)
}

