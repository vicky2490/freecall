import React, { Component } from 'react';
import './GameIndex.css';

class GameIndex extends Component {

  constructor() {
    super();
    this.state = {
    } 
  }

  render() {

    return (
      <div className="game-wrap">
        <div className="header">
          <div className="title">FREECELL</div>
          <div className="count-bar">
            <div className="count-time-move">TIME:</div>
            <div className="count-time-move count-num">00:00</div>
            <div className="count-time-move">MOVE:</div>
            <div className="count-time-move count-num">00</div>
          </div>
        </div>
        <div className="context">
          <div className="vacancy-box"></div>
          <div className="vacancy-box"></div>
          <div className="vacancy-box"></div>
          <div className="vacancy-box"></div>
          <div className="standard-box suithearts">
            {/*<div className="diamonds"></div>*/}
          </div>
          <div className="standard-box suitdiamonds"></div>
          <div className="standard-box suitclubs"></div>
          <div className="standard-box suitspades"></div>
        </div>
        
      </div>
    )
  }

}

export default GameIndex;