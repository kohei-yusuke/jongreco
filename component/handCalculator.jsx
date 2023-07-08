import React,{useEffect, useState} from "react";
import Image from "next/image";
import path from 'path';
import axios from "axios";

const HandCalculator = () =>{
    let tiles_row1=[];
    let tiles_row2=[];
    let tiles_row3=[];
    let tiles_row4 = [];
    const tiles_jihai = ["ton","nan","sha","pei","haku","hatsu","chun"]

    for(let i=1;i<10;i++){
        tiles_row1.push("/img/hai/"+String(i)+"m"+".png");
        tiles_row2.push("/img/hai/"+String(i)+"s"+".png");
        tiles_row3.push("/img/hai/"+String(i)+"p"+".png");
    }
    
    tiles_jihai.forEach((element)=>{
        tiles_row4.push("/img/hai/"+element+".png")
    });

    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];

    for(let i=1;i<10;i++){
        row1.push(<div className="col bg-dark">
                    <a key={String(i)+"m"} value={String(i)+"m"}>
                        <img src={tiles_row1[i]} className="img-fluid m-1" />
                    </a>
                </div>)
        
        row2.push(<div className="col bg-dark">
                    <img src={tiles_row2[i]} className="img-fluid m-1" />
                 </div>)

        row3.push(<div className="col bg-dark">
                    <img src={tiles_row3[i]} className="img-fluid m-1" />
                </div>);
    }

    tiles_row4.forEach((element)=>{
        row4.push(<div className="col bg-dark">
                    <img src={element} className="img-fluid m-1" />
                </div>)
    });
    for(let j=0;j<2;j++){
        row4.push(<div className="col"></div>);
    }

    const TilesSelecter = () =>{
        return(<>
        <div className="row g-0">
            {row1}
        </div>
        <div className="row g-0">
            {row2}
        </div>
        <div className="row g-0">
            {row3}
        </div>
        <div className="row g-0">
            {row4}
        </div>
        </>)
    }


    const HandDisplay = () =>{
        return(
            <div className="row">
                <div className="col-6">
                    <div className="row">

                    </div>
                </div>

                <div className="col-6">
                        <div className="row">
                        
                        </div>
                </div>
            </div>
        )
    }
    return(
        <div className="container">
                <HandDisplay/>
                <TilesSelecter/>
        </div>
    )
}

export default HandCalculator;