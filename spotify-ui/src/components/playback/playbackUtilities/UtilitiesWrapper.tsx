import React, { ReactElement } from 'react'
import Queue from './Queue'
import Volume from './Volume'

interface Props {
  
}

export default function UtilitiesWrapper({}: Props): ReactElement {
  console.log('rendering utilities')
  return (
    <div className="basis-1/3 flex justify-end items-center text-lg gap-4">
      <Queue />
      <Volume />
    </div>
  )
}
