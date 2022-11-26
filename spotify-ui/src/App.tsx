import React from 'react';
import { useDispatch } from 'react-redux';
import { increment } from './store/slices/example';


function App() {
  const dispatch = useDispatch();
  const example = () => {
    dispatch(increment());
  }
  
  return (
    <div>
      <header className="">
        header
      </header>
      <p onClick={example}>testing redux</p>;
    </div>
  );
}

export default App;
