import React, { Component } from 'react';
import './FinalMenu.css';
import { Link } from 'react-router-dom';


class FinalMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="bg">
 
        <div className="menu">
          <div className="card-spade"></div>
          <div className="card-heart"></div>
          <div className="card-club"></div>
          <button onClick={()=>this.props.newGame()}>NEW GAME</button>
          <Link to="/"><button>HOME</button></Link>
          <button onClick={()=>this.props.exit()}>EXIT</button>
        </div>
      </div>
    )
  }
}

export default FinalMenu;
