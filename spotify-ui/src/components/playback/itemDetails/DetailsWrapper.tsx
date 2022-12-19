import React, { ReactElement } from 'react'
import ItemDetails from './ItemDetails'
import ItemImageContainer from './ItemImageContainer'

interface Props {
  
}

export default function DetailsWrapper({}: Props): ReactElement {
  return (
    <div className="basis-1/3">
      <ItemImageContainer />
      <ItemDetails />
    </div>
  )
}
