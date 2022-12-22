import React from 'react'
import { useParams } from 'react-router'

type Props = {}

export default function Artist({}: Props) {
  const params = useParams();
  return (
    <div className="h-full w-full">
        <h1>Artist</h1>
        {/* <div className="h-screen"></div> */}
        <h2>{params?.artistid ?? 'no id found'}</h2>
    </div>
  )
}