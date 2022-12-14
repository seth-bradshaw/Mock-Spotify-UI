import React, { ReactElement } from 'react'
import BaseControl from './BaseControl'
import SkipTrack from './SkipTrack'
import TogglePlay from './TogglePlay'

interface Props {
  
}

export default function ControlsWrapper({}: Props): ReactElement {
  return (
    <div className="basis-3/5 flex items-center justify-center">
      <BaseControl>
        <SkipTrack className="scale-x-[-1]" />
      </BaseControl>
      <TogglePlay />
      <BaseControl>
        <SkipTrack />
      </BaseControl>
    </div>
  )
}
