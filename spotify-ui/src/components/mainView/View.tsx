import React from 'react'

type Props = {}

export default function View({}: Props) {
  return (
    <div className='row-span-1 overflow-y-auto relative bg-spotify-gray-800'>
      <p>View</p>
      <div className="h-full"></div>
      <div className="">bottom</div>  
    </div>
  )
}