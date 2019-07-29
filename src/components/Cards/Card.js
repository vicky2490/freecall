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
    let name = this.getCardImgCssName(cardRows.eachColor, cardRows.num);
    let draggable =  this.props.isLastCard;
    let source =  this.props.source;
    let key = source==='drag' ? this.props.p : 'auto';
    let rowIndex = this.props.rowIndex;

    return (
    <div className={`${name} card top-${key}`} draggable={Boolean(draggable)} id={`${source}-${cardRows.eachColor}-${cardRows.num}-${rowIndex}`}>
    </div>
    )
  }
}

export default Card;
