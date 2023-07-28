import { Route, Routes } from 'react-router';
import View from './components/mainView';
import Artist from './components/mainView/views/Artist/Artist';
import Playlist from './components/mainView/views/Playlist';
import Search from './components/mainView/views/Search/Search';
import Browse from './components/mainView/views/Home/Home';
import { Home, Landing } from './components/pages'; 
import Genre from './components/mainView/views/Genre/Genre';

function App() {

  return (
    <div className='h-full'>
      <Routes>
        <Route path='' element={<Landing />} />
        <Route path='home' element={<Home />} >
          <Route path='*' element={<View />} >
            <Route path='*' element={<Browse />} />
            <Route path='search' element={<Search />} />
            <Route path='artist/:artistid'  element={<Artist />} />
            <Route path='playlist/:playlistid' element={<Playlist />} />
            <Route path='genre/:categoryid' element={<Genre />} />
            <Route path='album/:albumid' element={<div>Album</div>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
