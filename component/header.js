import React from 'react'
import StartConfig from './startConfig';
import {useRouter} from 'next/router'

const Header = () => {
    const router = useRouter();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="#">JongReco</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a 
                                className="nav-link text-white" 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                            >
                                リーグモード
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link text-white" 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/scoreCalculator");
                                }}
                            >
                                点数計算モード
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header