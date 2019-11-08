import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (showLogo) {
      setTimeout(() => {
        setShowLogo(false);
      }, 3000);
    }
  }, [showLogo]);

  return (
    <div className="App">
      <header className="App-header">
        {showLogo && <img src={logo} className="App-logo" alt="logo" />}
        <button onClick={() => setShowLogo(true)}>Show Logo</button>
      </header>
    </div>
  );
}

export default App;
