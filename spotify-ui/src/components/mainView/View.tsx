import React from 'react'
import { Outlet, useParams } from 'react-router'

type Props = {}

export default function View({}: Props) {

  return (
    <div className='row-span-1 overflow-y-auto relative bg-spotify-gray-800'>
      <Outlet />
    </div>
  )
}