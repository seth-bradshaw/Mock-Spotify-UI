import React from 'react'
import MainView from '../mainView'
import NavMenu from '../navMenu'
import PlaybackSection from '../playback'
import './home.css'

export default function Home() {
  
  return (
    <div id="home-page" className="h-full home-layout">
      <NavMenu />
      <MainView />
      <PlaybackSection />
    </div>
  )
}
