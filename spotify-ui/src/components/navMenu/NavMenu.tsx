import React from 'react'
import Resize from './Resize'
import { Link } from 'react-router-dom'
type Props = {}

export default function Menu({}: Props) {
  return (
    <div className="col-span-1 flex relative bg-black">
      <div className="text-white w-full">
        <Link to="artist/12345" >Menu</Link>
      </div>
      <Resize />
    </div>
  )
}