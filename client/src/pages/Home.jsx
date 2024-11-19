import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div>
          Daily trending news in tech and World!
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home
