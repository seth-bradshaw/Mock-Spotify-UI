import React from 'react'
import Resize from './Resize'
type Props = {}

export default function Menu({}: Props) {
  return (
    <div className="col-span-1 flex relative bg-black">
      <div className="text-white w-full">Menu</div>
      <Resize />
    </div>
  )
}