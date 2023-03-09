import React,{useState} from 'react'
import {useRouter} from 'next/router'

const Header = () =>{
    return(
        <div className="navbar navbar-dark bg-dark" role="navigation">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">JongReco</a>
            </div>
        </div>
    )

}

export default Header;