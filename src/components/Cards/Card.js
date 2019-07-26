import React, { Component } from 'react';
import './Card.css';
import test from '../../img/club/club_1.png';


class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card: [],
      cardRows: [],
    } 
  }

  getCardImgUrl = (eachColor, number) => {
    let url = 'img/';
    switch (eachColor) {
      case 0:
        url += 'spade/spade_'
        break;
      case 1:
        url += 'heart/heart_'
        break;
      case 2:
        url += 'club/club_'
        break;
      case 3:
        url += 'diamond/diamond_'
        break;
      default:
        break;
    }
    url += `${number}.png`;
    // return url;
    return test;
    return '../../img/club/club_1.png';
  }

  render() {
    let cardRows = this.props.cardRows;
    let url = this.getCardImgUrl(cardRows.eachColor, cardRows.num);

    return (
    <div style={{background: 'url(' + url + ')',height: '140px', width: '135px'}}>
    </div>
    )
  }
}

export default Card;
