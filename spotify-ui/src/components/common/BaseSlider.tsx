import React, { MouseEvent, MouseEventHandler, ReactElement, ReactHTMLElement } from 'react'

interface Props {
  defaultValue: number;
  handleChange: MouseEventHandler; 
}

export default function BaseSlider({ defaultValue = 0, handleChange }: Props): ReactElement {
  return (
    <input
        type="range"
        min="0"
        max="100"
        defaultValue={defaultValue}
        onMouseUp={handleChange}
    />
  )
}
