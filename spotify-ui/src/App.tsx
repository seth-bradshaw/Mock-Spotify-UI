import React from 'react';
import { loginWithSpotify, refreshSpotifyToken } from './services'
import SpotifyPlayback from './components/playback/SpotifyPlayback'

function App() {
  
  return (
    <div>
      <header className="">
      </header>
      <p onClick={() => loginWithSpotify()} className="text-7xl">Login</p>
      <p onClick={async () => await refreshSpotifyToken()}>Refresh Token</p>
      <SpotifyPlayback/>
    </div>
  );
}

export default App;
