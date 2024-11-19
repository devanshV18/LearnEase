import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar/>
      <div>
        The content body comes here
      </div>
      <Footer/>
    </>
  )
}

export default Home
