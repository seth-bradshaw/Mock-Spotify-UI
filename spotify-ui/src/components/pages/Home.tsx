import React, {useEffect} from 'react'
import SpotifyPlayback from '../playback/SpotifyPlayback'
import PlaybackContextProvider from '../playback/PlaybackContext'
export default function Home() {
  useEffect(() => {
    console.log('inside seths butt')
  }, [])
  console.log('outside seths butt')
  return (
    <div>
      <PlaybackContextProvider/>
    </div>
  )
}
