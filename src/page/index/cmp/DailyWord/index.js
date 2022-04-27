import myFetch from "./service/fetch";
import React, { useEffect, useState } from "react";
const DailyWord = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    myFetch("https://saying.api.azwcl.com/saying/get").then((data) => {
      setData(data.data);
    });
  }, []);
  return (
    <div>
      {data.content} ——<span>{data.author}</span>
    </div>
  );
};
export default DailyWord;
