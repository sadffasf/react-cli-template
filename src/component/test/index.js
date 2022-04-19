import {useEffect, useState} from "react";
import './test.css';
import justifiedLayout from 'justified-layout';
import {Image,Button} from "antd";


export const Cats = (props)=>{
    const [catList,setCatList] = useState([]);
    const [layout,setLayout] = useState([]);

    const getCatPhotos = ()=>{
        setCatList([]);
        setLayout([]);
        fetch('https://api.thecatapi.com/v1/images/search?limit=20').then((response)=>{return response.json()}).then(data=>{
            setCatList(data);
            setLayout( justifiedLayout(data.map(item=>{return item.width/item.height}),{
                containerPadding:10,
                targetRowHeight:160,
                containerWidth: document.getElementById("catContainer").clientWidth-20
            }).boxes)
        })
    }

    useEffect(()=>{
        getCatPhotos()
    },[])

    return (<div>
        <div>
            <Button type="primary" onClick={()=>{
                getCatPhotos();
            }}
            >换一批</Button>
        </div>
        <div id="catContainer" style={{position:'relative',width:'100%'}}>
            {
                layout.map((item,index)=>{
                    const imageItem = catList[index];
                    const style={
                        position:'absolute',
                        width:item.width+'px',
                        height:item.height+'px',
                        left:item.left+'px',
                        top:item.top+'px'
                    }
                    return <div  key={index} style={style}>
                        <Image placeholder={<div style={{width:'100%',height:'100%',background:"#ddd"}}></div>} width={item.width} height={item.height} src={imageItem.url} alt=""/>
                    </div>
                })
            }
        </div>
    </div>)
}

