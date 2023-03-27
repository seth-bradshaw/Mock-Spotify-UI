import React, { PropsWithChildren } from 'react'
import PlayIcon from '../../../common/PlayIcon'
import BaseControl from '../../../playback/controls/BaseControl'

type Props = {
    handleClickPlay: () => void
}

export default function ActionBar({ handleClickPlay, children }: PropsWithChildren<Props>) {
  return (
        <div className="w-full p-4 flex items-center gap-6">
          <BaseControl clickHandler={handleClickPlay} className="bg-spotify-green-400 h-14 w-14">
            {/* TODO update this to ui reducer state once that's set up */}
            <PlayIcon isPlaying={false} />
          </BaseControl>
          {children}
        </div>
  )
}