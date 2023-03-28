import React, { useEffect } from 'react'
import { useDispatch } from '../../store/hooks'
import { fetchFollowedArtists } from '../../store/slices/artist'
import { fetchSavedTracks } from '../../store/slices/track'
import { fetchSpotifyProfile } from '../../store/slices/user'
import MainView from '../mainView'
import NavMenu from '../navMenu'
import PlaybackSection from '../playback'
import './home.css'

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotifyProfile(''));
    dispatch(fetchFollowedArtists({}));
    dispatch(fetchSavedTracks({}));
  }, [])
  
  return (
    <div id="home-page" className="h-full home-layout">
      <NavMenu />
      <MainView />
      <PlaybackSection />
    </div>
  )
}
