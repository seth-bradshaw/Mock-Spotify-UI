import React, { ReactElement } from 'react'

interface Props {
  
}

export default function ItemImageContainer({}: Props): ReactElement {
  // ? should we pass img element as child.
  // ? My thoughts are a BaseImage component for all images, and container determines size
  return (
    <div>
      <img></img>
    </div>
  )
}
