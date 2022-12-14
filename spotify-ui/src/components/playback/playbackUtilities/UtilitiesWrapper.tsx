import React, { ReactElement } from 'react'
import Queue from './Queue'
import Volume from './Volume'

interface Props {
  
}

export default function UtilitiesWrapper({}: Props): ReactElement {
  console.log('rendering utilities')
  return (
    <div className="basis-1/5 flex flex-col justify-center items-center text-lg">
      <Volume />
      <Queue />
    </div>
  )
}
