import React,{useEffect, useState} from "react";
import Image from "next/image";
import path from 'path';
import axios from "axios";



const Calculator = () =>{
    ///翻数と符を入力して点数を取得する計算機

    const [data, setData] = useState();
    ///デプロイ後に変える
    const root_url= "https://jongreco.vercel.app/backend/"
    const [url, setUrl] = useState(root_url);

    const [han,setHan] = useState();
    const [hu, setHu] = useState();
    const [is_chitoitsu,set_is_chitoitsu] = useState(false);
    const [is_pinfu, set_is_pinfu] = useState(false);
    const [is_table_active, set_is_table_active] = useState(false)

    const str_han = String(han)
    const str_hu = String(hu)
    const str_is_chitoitsu = String(is_chitoitsu)

    const new_url = root_url+'score_calc/'+'han/'+str_han+'/hu/'+str_hu+'/is_chitoitsu/'+str_is_chitoitsu;
    

    ///apiから点数データを取得
    const GetData =  () =>{
        console.log("new_url:"+new_url);
        axios.get(new_url).then((res)=>{
            setData(res.data);
            console.log('GetData complete')
        });
        if(data !== undefined){
        set_is_table_active(true);
        console.log(is_table_active);}
    };


    const input_hu_box = () =>{
        if(is_pinfu){
            
            return(
                <div className="input-group col">
                    <input 
                    className = "form-control text-end"
                    key = "hu"
                    value = {20}
                    type = "number"
                    disabled
                    />
                    <div className="input-group-text">符</div>
                </div>
            )
        
        }else if(is_chitoitsu){
            return(
                <div className="input-group col">
                    <input 
                    className = "form-control text-end"
                    key = "hu"
                    value = {25}
                    type = "number"
                    disabled
                    />
                    <div className="input-group-text">符</div>
                </div>
            )
        }else{
            return(
                <div className="input-group col">
                    <select className="form-select" onChange={(e)=>setHu(e.target.value)}>
                        <option selected>符数</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90">90</option>
                        <option value="100">100</option>
                        <option value="110">110</option>
                    </select>
                    <div className="input-group-text">符</div>
                </div>
                )
        }
    }

    const input_han_box = () =>{
        let han_box = []
        for(let i=0;i<12;i++){
            han_box.push(<option value={String(i+1)}>{i+1}</option>)
        }
        return(
            <div className="input-group col">
                    <select className="form-select" onChange={(e)=>setHan(e.target.value)}>
                        <option selected>翻数</option>
                        {han_box}
                        <option value = '13'>13over</option>
                    </select>
                    <div className="input-group-text">翻</div>
                </div>
        )
    }

    const btn_chitoitsu = () =>{
        if(is_pinfu){
            return(
                <button 
                className="btn btn-secondary"
                value = {is_chitoitsu}
                key = "is_chitoitsu"
                disabled
                >
                    七対子 off
                </button>
            )
        
        }else if(is_chitoitsu){
            return(
                <button 
                className="btn btn-primary"
                value = {is_chitoitsu}
                onClick = {e =>{set_is_chitoitsu(false);
                            setHu("25");}}
                key = "is_chitoitsu"
                >
                    七対子 on
                </button>
            )
        }else{
            return(
                <button
                className = "btn btn-secondary"
                value = {is_chitoitsu}
                onClick = {e =>{set_is_chitoitsu(true)}}
                key = "is_chitoitsu"
                >
                    七対子 off
                </button>
            )
        }
    }

    const btn_pinfu = () =>{
        if(is_chitoitsu){
            return(
                <button
                className = "btn btn-secondary"
                value = {is_pinfu}
                key = "is_pinfu"
                disabled
                >
                    平和 off
                </button>
            )
        
        }else if(is_pinfu){
            return(
                <button 
                className="btn btn-primary"
                value = {is_pinfu}
                onClick = {e =>{set_is_pinfu(false)}}
                key = "is_pinfu"
                >
                        平和 on
                </button>
            )
        }else{
            return(
                <button
                className = "btn btn-secondary"
                value = {is_pinfu}
                onClick = {e =>{set_is_pinfu(true);
                                setHu(20);}}
                key = "is_pinfu"
                >
                    平和 off
                </button>
            )
        }
    }

    const submitHanHu = () =>{
        return(
            <button 
            className="btn btn-success"
            type= "submit"
            onClick={GetData}
            >計算
            </button>
        )
    }

    const score_table =() =>{
        if(is_table_active){
            return(
                <div className="container bg-light text-center">
                    <div className="row">
                        <div className="col">{hu}符{han}翻</div>
                    </div>
                    <table className="table table-border">
                        <thead>
                            <tr>
                                <th scope="col">点数</th>
                                <th scope="col">ツモ</th>
                                <th scope="col">ロン</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">親</th>
                                <td>{data.tsumo_dealer.main}All</td>
                                <td>{data.ron_dealer.main}</td>
                            </tr>
                            <tr>
                                <th scope="row">子</th>
                                <td>{data.tsumo_child.additional}-{data.tsumo_child.main}</td>
                                <td>{data.ron_child.main}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }else{
            return(<div className="bg-success"></div>)
        }
    }

    return(
        <div id="hanhuCalc">
            <div className = "container text-center mb-3 p-3 fs-6 text-nowrap bg-light">
                <div className="input-group row">
                    {input_hu_box()}
        
                    {input_han_box()}
                </div>
                <div className="input-group row">
                    <div className="input-group col">
                        {btn_chitoitsu()}
                    </div>

                    <div className="input-group col">
                        {btn_pinfu()}
                    </div>

                    <div className="input-group col">
                        {submitHanHu()}
                    </div>
                </div>             
            </div>
            {score_table()}
        </div>
    );
}


export default Calculator;