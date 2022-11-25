import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const login = () => {
    window.location.href = 'http://localhost:8080/auth/userlogin'
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={login}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
