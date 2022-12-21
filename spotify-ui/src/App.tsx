import React from 'react';
import { Route, Routes } from 'react-router';
import { Home, Landing } from './components/pages'; 

function App() {

  return (
    <div className='h-full'>
      <Routes>
        <Route path='' element={<Landing />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
