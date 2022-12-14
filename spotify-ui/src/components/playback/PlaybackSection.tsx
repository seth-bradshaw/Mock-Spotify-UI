import React, { ReactElement } from 'react'
import ControlsWrapper from './controls'
import DetailsWrapper from './itemDetails'
import UtilitiesWrapper from './playbackUtilities'

interface Props {

}

export default function PlaybackSection({}: Props): ReactElement {
  return (
    <div className="bg-spotify-gray-800 w-full h-40 text-spotify-gray-200 flex">
      <DetailsWrapper />
      <ControlsWrapper />
      <UtilitiesWrapper />
    </div>
  )
}
