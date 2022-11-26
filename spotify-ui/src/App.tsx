import React from 'react';
import { useDispatch } from 'react-redux';
import { increment } from './store/slices/example';
import {loginWithSpotify, getPlaybackDevices} from './services'
import SpotifyPlayback from './components/playback/SpotifyPlayback'

function App() {
  const dispatch = useDispatch();
  const cliks = () => {
    getPlaybackDevices()
  }
  
  return (
    <div>
      <header onClick={() => cliks()} className="">
       device list baby
      </header>
      <p onClick={() => loginWithSpotify()} className="text-7xl">testing redux</p>
      <SpotifyPlayback/>
    </div>
  );
}

export default App;
