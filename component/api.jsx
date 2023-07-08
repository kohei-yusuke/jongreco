import React,{useState} from "react";
import axios from "axios";

const Api = () =>{
    const [data, setData] = useState();
    const url = "http://127.0.0.1:8000";

    const GetData = () =>{
        axios.get(url).then((res)=>{
            setData(res.data);
        });
    };

    return (
        <div>
            <div>ここに処理を記載</div>
            {data? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
        </div>
    );
}

export default Api;