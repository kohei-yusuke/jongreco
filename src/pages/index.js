import React from 'react'
import Layout from 'component/layout'
import Header from 'component/header'
import Title from 'component/title'
import IndexDescription from 'component/indexDescription'
import StartConfig from 'component/startConfig'
import Api from 'component/api'
import Footer from 'component/footer'
import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <Layout>
      <div className="bg-light">
      <Header/>
      <Title/>
      <IndexDescription/>
      <StartConfig />
      <Footer/>
      </div>
    </Layout>
  );
}


