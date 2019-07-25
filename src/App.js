import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="wrap">
      <div className="index-menu">
        <div className="index-menu-box">
          <Link to="/game"><button className="start-button">START</button></Link>
          <div className="caption">How to play?</div>
        </div>
      </div>
    </div>
  );
}

export default App;
