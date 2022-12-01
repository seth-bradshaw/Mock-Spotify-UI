import React from 'react';
import { loginWithSpotify, refreshSpotifyToken } from './services'
import SpotifyPlayback from './components/playback/SpotifyPlayback'
import SearchInput from './components/search/SearchInput';
function App() {
  
  return (
    <div>
      <header className="">
      </header>
      <p onClick={() => loginWithSpotify()} className="text-7xl">Login</p>
      <p onClick={async () => await refreshSpotifyToken()}>Refresh Token</p>
      <SpotifyPlayback/>
      <SearchInput/>
    </div>
  );
}

export default App;
