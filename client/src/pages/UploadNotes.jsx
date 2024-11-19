import React from 'react'
import {Link, Outlet} from "react-router-dom"
import MyNotes from './MyNotes.jsx'
const UploadNotes = () => {
  return (
    <div className='flex gap-4'>
      Upload Notes
      <MyNotes/>
    </div>
  )
}

export default UploadNotes
