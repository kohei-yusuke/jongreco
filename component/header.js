import React,{useState} from 'react'
import StartConfig from './startConfig';
import {useRouter} from 'next/router'

const Header = () =>{
    const router = useRouter();


    return(
        <div className="navbar navbar-dark bg-dark" role="navigation">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">JongReco</a>
                <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target = "#links"
                aria-controls="links"
                aria-expanded = "false"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="links">
                    <ul className="navbar-nav me-auto text-white text-end">
                        <li><a >リーグモード</a></li>
                        <li><a onClick={(e)=>{router.push("/scoreCalculator")}}>点数計算モード</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default Header;