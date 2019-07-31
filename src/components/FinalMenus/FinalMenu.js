import React, { Component } from 'react';
import './FinalMenu.css';
import { Link } from 'react-router-dom';


class FinalMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isSuccess = this.props.isSuccess;
    return (
      <div className="bg">
        <div className="show-box">
          <div className="dosply-title">TIME</div>
          <div className="dosply-num">{this.props.time}</div>
        </div>
        <div className="menu">
          {
            isSuccess && <div className="success">Congratulations! You Won the Game.</div>
          }
          <div className="card-spade"></div>
          <div className="card-heart"></div>
          <div className="card-club"></div>
          <button onClick={()=>this.props.newGame()}>NEW GAME</button>
          <Link to="/"><button>HOME</button></Link>
          <button onClick={()=>this.props.exit()}>EXIT</button>
        </div>
        <div className="show-box">
          <div className="dosply-title">BEST</div>
          <div className="dosply-num">{this.props.bestTime}</div>
        </div>
      </div>
    )
  }
}

export default FinalMenu;
