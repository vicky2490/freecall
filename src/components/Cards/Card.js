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

  componentDidMount() {
    let dragSources = document.querySelectorAll('[draggable="true"]')
    dragSources.forEach(dragSource => {
      dragSource.addEventListener('dragstart', this.dragStart)
    })
  }

  dragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
    let sourceContainerId = e.target.id

    if (this.props.setSourceContainerId) {
      this.props.setSourceContainerId(sourceContainerId)
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
    let draggable =  this.props.isLastCard;

    return (
    <div className={`${name} card top-${key}`} draggable={Boolean(draggable)} id={`drag-${cardRows.eachColor}-${cardRows.num}-${cardRows.rowIndex}`}>
    </div>
    )
  }
}

export default Card;
