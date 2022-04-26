import React,{useEffect, useState} from "react";
import styles  from './test.module.css';
import justifiedLayout from 'justified-layout';
import {Image,Button} from "antd";
import myFetch from 'src/service/fetch'


const JustifyLayout = (props)=>{
    const layoutData = justifiedLayout(props.data.map(item=>{return item.width/item.height}),{
        containerPadding:10,
        targetRowHeight:160,
        containerWidth: document.body.clientWidth-100
    }).boxes;
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
        return    myFetch('https://api.thecatapi.com/v1/images/search?limit=30')
    }
    /*换一批*/
    const getOtherCats = ()=>{
        setCatList([]);
        getCatPhotos().then(data=>{
            setCatList(data);
        })
    }
    useEffect(()=>{
        getOtherCats();
    },[])
    return (<div>
        <div className={styles.others} >
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

