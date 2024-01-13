import { ReactElement } from 'react'
import { skipToNext, skipToPrevious } from '../../../services'
import BaseControl from './BaseControl'
import PlaybackBar from './PlaybackBar'
import SkipTrack from './SkipTrack'
import TogglePlay from './TogglePlay'

interface Props {}

export default function ControlsWrapper({}: Props): ReactElement {
  return (
    <div className="basis-full min-w-[276px] md:basis-2/5 flex flex-col items-center justify-center">
      <div className="flex nowrap gap-4 mb-2">
        <BaseControl clickHandler={() => skipToPrevious()}>
          <SkipTrack className="scale-x-[-1]" />
        </BaseControl>
        <TogglePlay />
        <BaseControl clickHandler={() => skipToNext()}>
          <SkipTrack />
        </BaseControl>
      </div>
      <PlaybackBar />
    </div>
  )
}
