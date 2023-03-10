import React,{useState} from 'react'
import {useRouter} from 'next/router'
import MatchResult from 'component/matchResult'
import  useLeavePageConfirmation  from 'component/useLeaveConfirmation'
import Layout from 'component/layout'
import Header from 'component/header'
import Footer from 'component/footer'
import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  const [showLeavingAlert, setShowLeavingAlert] = useState(true);
  useLeavePageConfirmation(showLeavingAlert);

  return (
    <Layout>
    <Header/>
      <div className="bg-success">
        <MatchResult />
      </div>
    <Footer/>
    </Layout>
  )
}

