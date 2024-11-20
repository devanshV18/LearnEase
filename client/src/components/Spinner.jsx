import React from 'react'

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-black rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
      </div>
    </div>
  )
}

export default Spinner


