import React, { Component } from 'react';
import './GameIndex.css';
import _ from 'lodash';
import Card from '../Cards/Card';

class GameIndex extends Component {

  constructor() {
    super();
    this.state = {
      card: [],
      cardRows: [],
    } 
  }

  // 畫面出來前 給予card預設值(洗牌,每排幾張)以及發牌
  componentWillMount () {
    let card = [];
    let row = [7,7,7,7,6,6,6,6];
    let cardRows = [];
    for (let j=0; j<52; j++) {
      card.push(j);
    }
    for (let i=0; i<50; i++) {
      let swapA = Math.floor(Math.random()*(52))+1;
      let swapB = Math.floor(Math.random()*(52))+1;
      let temp = card[swapA-1];
      card[swapA-1] = card[swapB-1];
      card[swapB-1] = temp;
      // 位置幾張
      let rowSwapA = Math.floor(Math.random()*(8))+1;
      let rowSwapB = Math.floor(Math.random()*(8))+1;
      let rowTemp = row[rowSwapA-1];
      row[rowSwapA-1] = row[rowSwapB-1];
      row[rowSwapB-1] = rowTemp;
    }

    // 發牌
    for (let k=0; k<8; k++) {
      let step = row[k];
      let content = _.take(card, step);
      content = _.map(content, function(data){
        return {
          eachColor: Math.floor(data/13),
          num: (data + 1) % 13 === 0 ? 13 : (data + 1) % 13, 
          dataIdex: data,
        }
      });  

      cardRows.push({
        row: k+1,
        content,
      });
      card = _.drop(card, step);
    }

    this.setState({
      card, 
      cardRows, 
    })
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
          <div className="standard-box suithearts"></div>
          <div className="standard-box suitdiamonds"></div>
          <div className="standard-box suitclubs"></div>
          <div className="standard-box suitspades"></div>

          <div className="card-row">
          {
            this.state.cardRows[0].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[1].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[2].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[3].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[4].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[5].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[6].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[7].content.map((data, i) => <Card key={i} cardRows={data} p={i}/>)
          }
          </div>
        </div>
        
      </div>
    )
  }

}

export default GameIndex;