import React,{useState} from 'react'
import {useRouter} from 'next/router'
import  useLeavePageConfirmation  from 'component/useLeaveConfirmation'
import Calculator from 'component/calculator'
import handCalculator from 'component/handCalculator'
import Layout from 'component/layout'
import Header from 'component/header'
import Footer from 'component/footer'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter();

    return(
        <Layout>
        <Header/>
        <div className="bg-light">
            <ul className="nav nav-tabs b-3" id="calcTabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link  active"
                     id="hanhu-tab" 
                     data-bs-toggle="tab"
                      href="#hanhu"
                      role="tab"
                      aria-controls="hanhu"
                      aria-selected="true">
                        翻符計算</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link"
                     id="hand-tab" 
                     data-bs-toggle="tab"
                      href="#hand"
                      role="tab"
                      aria-controls="hand"
                      aria-selected="false">
                        手牌計算</a>
                </li>
            </ul>

            <div className="tab-content mt-3" id="calcTabContents">
                <div className="tab-pane fade show active" id="hanhu" role="tabpanel" aria-labelledby='hanhu-tab'>
                    <Calculator/>
                </div>
                <div className="tab-pane fade" id="hand" role="tabpanel" aria-labelledby='hand-tab'>
                    {handCalculator()}
                </div>
            </div>
        </div>
        <Footer/>
        </Layout>
    )
}

