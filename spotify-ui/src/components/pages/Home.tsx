import React from 'react'
import PlaybackSection from '../playback'
import PlaybackContextProvider from '../playback/context/PlaybackContext'
export default function Home() {
  
  return (
    <div>
      <PlaybackContextProvider>
        <PlaybackSection />
      </PlaybackContextProvider>
    </div>
  )
}
