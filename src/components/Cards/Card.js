import React, { Component } from 'react';
import './Card.css';


class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card: [],
      cardRows: [],
    } 
  }

  getCardImgCssName = (eachColor, number) => {
    let cssName = '';
    switch (eachColor) {
      case 0:
        cssName += 'spade-'
        break;
      case 1:
        cssName += 'heart-'
        break;
      case 2:
        cssName += 'club-'
        break;
      case 3:
        cssName += 'diamond-'
        break;
      default:
        break;
    }
    cssName += number;
    return cssName;
  }

  render() {
    let cardRows = this.props.cardRows;
    let key = this.props.p;
    let name = this.getCardImgCssName(cardRows.eachColor, cardRows.num);
    return (
    <div className={`${name} card top-${key}`}>
    </div>
    )
  }
}

export default Card;
