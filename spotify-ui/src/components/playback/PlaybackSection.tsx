import React, { ReactElement } from 'react'
import PlaybackContextProvider from './context/PlaybackContext'
import ControlsWrapper from './controls'
import DetailsWrapper from './itemDetails'
import UtilitiesWrapper from './playbackUtilities'

interface Props {

}

// TODO discuss mobile styling
export default function PlaybackSection({}: Props): ReactElement {
  return (
    <section className="block absolute bottom-0 px-4 py-2 w-full md:min-w-[768px] h-24 bg-spotify-gray-800 z-40">
      <PlaybackContextProvider>
        <div className="flex h-full text-spotify-gray-200">
          <DetailsWrapper />
          <ControlsWrapper />
          <UtilitiesWrapper />
        </div>
      </PlaybackContextProvider>
    </section>
  )
}
