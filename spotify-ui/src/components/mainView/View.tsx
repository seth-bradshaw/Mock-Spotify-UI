import React from 'react'
import { Outlet, useParams, useNavigate } from 'react-router'

type Props = {}

export default function View(props: Props) {
  const params = useParams();
  const navigate = useNavigate();
  console.log('params', {route: params['*']?.slice(0, params['*'].indexOf('/')), props})
  return (
    <div className='row-span-1 overflow-y-auto relative bg-spotify-gray-800'>
      {/* TODO view sticky header goes here */}
      <div className='h-24 w-full bg-white fixed'>
        <button type="button" onClick={() => navigate(-1)}>go back</button>
      </div>
      <Outlet />
    </div>
  )
}