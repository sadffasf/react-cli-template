```jsx
const data = [  {"breeds": [], "categories": [
                                                                            {
                                                                                "id": 6,
                                                                                "name": "caturday"
                                                                            }
                                                                        ],
                                                                        "id": "q8",
                                                                        "url": "https://cdn2.thecatapi.com/images/q8.jpg",
                                                                        "width": 525,
                                                                        "height": 700
                                                                    },
                                                                    {
                                                                        "breeds": [],
                                                                        "id": "1va",
                                                                        "url": "https://cdn2.thecatapi.com/images/1va.jpg",
                                                                        "width": 500,
                                                                        "height": 355
                                                                    },
                                                                    {
                                                                        "breeds": [],
                                                                        "categories": [
                                                                            {
                                                                                "id": 7,
                                                                                "name": "ties"
                                                                            }
                                                                        ],
                                                                        "id": "3bt",
                                                                        "url": "https://cdn2.thecatapi.com/images/3bt.jpg",
                                                                        "width": 300,
                                                                        "height": 251
                                                                    }
                                                              
                                                                ];
<JustifyLayout data={data} render={(item,index)=> <img style={{width:'100%',height:'100%'}} src={item.url} alt="" />}  />
```