import React from 'react'
import { Link } from 'react-router-dom'
import { FaMagnifyingGlass } from "react-icons/fa6";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div>
            <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight mt-12 mb-8 leading-tight">
            Online Certification Courses across the web, All at one place. <br /> 
            <span className="text-2xl md:text-4xl font-semibold text-gray-700">
              Search, Pick and Upskill!</span>
            </h1>


            <form className="flex justify-center items-center mb-12">
                <div className="relative w-full max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search to explore courses"
                    // value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 px-4 pr-12 text-black bg-gray-100 placeholder-gray-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                    >
                      <FaMagnifyingGlass className="h-6 w-6" />
                    </button>
                </div>
            </form>

        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home
