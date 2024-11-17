import React from 'react'

const Spinner = ({ size = 'md', strokeWidth = 4 }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className={`${sizeClasses[size]} relative`}>
        <div className={`absolute inset-0 border-t-transparent border-${strokeWidth} border-white rounded-full animate-spin`}></div>
        <div 
          className={`absolute inset-0 border-t-transparent border-${strokeWidth} border-black rounded-full animate-spin`} 
          style={{ animationDuration: '0.75s' }}
        ></div>
      </div>
    </div>
  )
}

export default Spinner