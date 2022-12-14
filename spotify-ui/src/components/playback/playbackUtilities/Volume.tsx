import React, { ReactElement } from 'react'
import BaseSlider from '../../common/BaseSlider'

interface Props {
  
}

export default function Volume({}: Props): ReactElement {
  return (
    <div>
      <BaseSlider defaultValue={0} handleChange={(e) => console.log((e.target as HTMLInputElement).value)}/>
    </div>
  )
}
