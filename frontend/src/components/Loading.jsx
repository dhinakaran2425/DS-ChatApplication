import React from 'react'
import { Lumiflex } from "uvcanvas"

function Loading() {
  return (
    <div className='relative flex justify-center items-center h-screen'>
      <div className='absolute inset-0 z-0'>
      <Lumiflex />
      </div>
      
      <div className="relative z-10 flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full bg-gray-800/50 backdrop-blur-sm"></div>
        <div className="skeleton h-4 w-28 bg-gray-800/50 backdrop-blur-sm"></div>
        <div className="skeleton h-4 w-full bg-gray-800/50 backdrop-blur-sm"></div>
        <div className="skeleton h-4 w-full bg-gray-800/50 backdrop-blur-sm"></div>
      </div>
    </div>
  )
}

export default Loading