import {useEffect, useState} from "react";
import './test.css';
import justifiedLayout from 'justified-layout';


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
            <button onClick={()=>{
                getCatPhotos();
            }}

            >换一批</button>
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
                    return <img key={index} style={style} src={imageItem.url} alt=""/>
                })
            }
        </div>
    </div>)
}

