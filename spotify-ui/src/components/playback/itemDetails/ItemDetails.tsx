import React, { ReactElement } from 'react'

interface Props {
  
}

export default function ItemDetails({}: Props): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p>Track</p>
      <p>Artist</p>
    </div>
  )
}
