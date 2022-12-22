import React from 'react';
import { Route, Routes } from 'react-router';
import View from './components/mainView';
import Artist from './components/mainView/views/Artist';
import { Home, Landing } from './components/pages'; 

function App() {

  return (
    <div className='h-full'>
      <Routes>
        <Route path='' element={<Landing />} />
        <Route path='home' element={<Home />} >
          <Route path='*' element={<View />} >
            <Route path='artist/:artistid'  element={<Artist />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
