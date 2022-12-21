import React from 'react'
import MainContent from '../mainView'
import NavMenu from '../navMenu'
import PlaybackSection from '../playback'
import './home.css'

export default function Home() {
  
  return (
    <div id="home-page" className="h-full home-layout">
      <NavMenu />
      <MainContent />
      <PlaybackSection />
    </div>
  )
}
