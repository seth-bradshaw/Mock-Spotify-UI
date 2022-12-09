import React from 'react';
import { loginWithSpotify, refreshSpotifyToken } from './services'
import SpotifyPlayback from './components/playback/SpotifyPlayback'
import SearchInput from './components/search/SearchInput';
function App() {

  const refreshToken = async () => {
    await refreshSpotifyToken();
  }

  return (
    <div>
      <header className="text-spotify-green-500">should be green</header>
      <p onClick={() => loginWithSpotify()} className="text-7xl">Login</p>
      <p onClick={refreshToken}>Refresh Token</p>
      <SpotifyPlayback/>
      <SearchInput/>
    </div>
  );
}

export default App;
