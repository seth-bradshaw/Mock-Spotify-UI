import { Route, Routes, useNavigate } from 'react-router';
import View from './components/mainView';
import Artist from './components/mainView/views/Artist/Artist';
import Playlist from './components/mainView/views/Playlist';
import Search from './components/mainView/views/Search/Search';
import Browse from './components/mainView/views/Home/Home';
import { Home, Landing } from './components/pages'; 
import Genre from './components/mainView/views/Genre/Genre';
import Album from './components/mainView/views/Album/Album';
import ModalPortal from './components/modals/ModalPortal';
import { useEffect } from 'react';
import { safeParse } from './utils';
import Cookies from 'js-cookie';

function App() {
  const parsedToken = safeParse(Cookies.get('spotify_access_token'), {})
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedToken?.access_token) {
      navigate('/home')
    } else {
      navigate('/')
    }
  }, [])

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
            <Route path='album/:albumid' element={<Album />} />
          </Route>
        </Route>
      </Routes>
      <ModalPortal />
    </div>
  );
}

export default App;
