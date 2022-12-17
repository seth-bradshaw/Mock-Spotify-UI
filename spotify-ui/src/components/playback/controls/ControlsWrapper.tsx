import React, { ReactElement } from 'react'
import { skipToNext, skipToPrevious } from '../../../services'
import BaseSlider from '../../common/BaseSlider'
import BaseControl from './BaseControl'
import SkipTrack from './SkipTrack'
import TogglePlay from './TogglePlay'

interface Props {
  
}

export default function ControlsWrapper({}: Props): ReactElement {
  return (
    <div className="basis-3/5 flex flex-col items-center justify-center">
      <div className="flex gap-4">
        <BaseControl clickHandler={() => skipToPrevious()}>
          <SkipTrack className="scale-x-[-1]" />
        </BaseControl>
        <TogglePlay />
        <BaseControl clickHandler={() => skipToNext()}>
          <SkipTrack />
        </BaseControl>
      </div>
      {/* <BaseSlider defaultValue={0} handleChange={(e) => console.log((e.target as HTMLInputElement).value)}/> */}
    </div>
  )
}
