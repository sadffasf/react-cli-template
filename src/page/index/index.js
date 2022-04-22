import React, {Component, useEffect, useState} from 'react'
import myFetch from 'src/service/fetch'
const DailyWord = ()=>{
    const [data,setData] = useState({})
    useEffect(()=>{
        myFetch('https://saying.api.azwcl.com/saying/get').then(data=>{
            setData(data.data);
        })
    },[])
    return <div>{data.content}   ——<span>{data.author}</span></div>
}

export default class extends Component{
    render() {
        return <div>
            <DailyWord/>
        </div>
    }
}