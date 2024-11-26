import React from 'react'
import PdfCard from '../components/PdfCard'
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner.jsx';


const MyNotes = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-3">
      <Link to = '/'>
        <FaArrowLeft />
      </Link>
      <h2 className="text-2xl font-semibold mb-4">My Notes</h2>
      <p className='text-md font-semibold'>Your uploaded PDFs will appear here.</p>
      <div>
        <PdfCard/>
      </div>
      {/* <Spinner/> */}
    </div>
  )
}

export default MyNotes
