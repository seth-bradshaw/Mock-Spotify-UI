import React, { useEffect } from 'react'
import { useDispatch } from '../../store/hooks'
import { fetchFollowedArtists } from '../../store/slices/artist'
import { fetchSavedTracks } from '../../store/slices/track'
import { fetchSpotifyProfile } from '../../store/slices/user'
import MainView from '../mainView'
import NavMenu from '../navMenu'
import PlaybackSection from '../playback'
import './home.css'
import { fetchSavedPlaylists } from '../../store/slices/playlist'
import fetchCategories from '../../store/slices/categories/fetchCategories'
import fetchSavedAlbums from '../../store/slices/album/fetchSavedAlbums'

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotifyProfile(''));
    dispatch(fetchFollowedArtists({}));
    dispatch(fetchSavedTracks({}));
    dispatch(fetchSavedPlaylists({}));
    dispatch(fetchSavedAlbums({}))
  }, [])
  
  return (
    <div id="home-page" className="h-full home-layout">
      <NavMenu />
      <MainView />
      <PlaybackSection />
    </div>
  )
}
