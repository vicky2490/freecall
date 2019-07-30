import React, { Component } from 'react';
import './GameIndex.css';
import _ from 'lodash';
import Card from '../Cards/Card';
import moment from 'moment';

class GameIndex extends Component {

  constructor() {
    super();
    this.state = {
      card: [],
      cardRows: [],
      sourceContainerId: '',
      targetContainer: [[],[],[],[],[],[],[],[]],
      move: '00',
      time: 0,
    } 
    this.interval = setInterval(() => {
      let time = this.state.time + 1;
      this.setState({
        time,
      });
    }, 1000);
  }

  componentDidMount() {
    let dropTargets = document.querySelectorAll('[data-role="drag-drop-container"]')
    dropTargets.forEach(dropTarget => {
      dropTarget.addEventListener('drop', this.dropped)
      dropTarget.addEventListener('dragenter', this.cancelDefault)
      dropTarget.addEventListener('dragover', this.cancelDefault)
    })
   }

  cancelDefault = (e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  dropped = (e) => {
    console.log('dropped')
    // get source
    let data = e.dataTransfer.getData('text/plain').split('-');
    let arrayName = data[0];
    let colorOfSourceCard = data[1];
    let numOfSourceCard = data[2];
    let rowIndex = data[3];
    let rowData;
    let cardRows = _.clone(this.state.cardRows);
    let newTargetContainer = _.clone(this.state.targetContainer);
    // get target
    let targetData = e.target.id.split('-');
    let targetArrayName = targetData[0];
    let targetBoxIndex = targetData[3];
    let targetElement;

    // get vacancyBox or standardBox or card
    if (e.target.className.split(' ')[0] === 'card' && targetArrayName === 'drag') {
      targetElement = e.target;
    } else {
      targetElement = newTargetContainer[`${targetBoxIndex}`].length >= 1 ? e.target.parentElement : e.target;
    }
    
    let targetClassName = targetElement.className.split(' ')[0];
    let isInVacancyBox = targetClassName === 'vacancy-box';
    let isInStandardBox = targetClassName === 'standard-box';
    let isInCard = targetClassName === 'card';

    // 花色比對
    let colorOfTargetContainer = targetElement.className.split(' ')[1];
    if (isInCard) {
      colorOfTargetContainer = Number(e.target.id.split('-')[1]);
    }
    // 同種花色 for 右上角四個 standard-box
    let isSameKindColor = false;
    switch (colorOfTargetContainer) {
      case 'suithearts':
        isSameKindColor = Number(colorOfSourceCard) === 1;
        break;
      case 'suitdiamonds':
        isSameKindColor = Number(colorOfSourceCard) === 3;
        break;
      case 'suitclubs':
        isSameKindColor = Number(colorOfSourceCard) === 2;
        break;
      case 'suitspades':
        isSameKindColor = Number(colorOfSourceCard) === 0;
        break;
    
      default:
        break;
    }

    // 同顏色花色 for cards
    let isSameColor = false;
    switch (Number(colorOfTargetContainer)) {
      case 1 :
          isSameColor = Number(colorOfSourceCard) === 1 || Number(colorOfSourceCard) === 3;
        break;
      case 3 :
          isSameColor = Number(colorOfSourceCard) === 1 || Number(colorOfSourceCard) === 3;
        break;
      case 0 :
          isSameColor = Number(colorOfSourceCard) === 0 || Number(colorOfSourceCard) === 2;
        break;
      case 2 :
          isSameColor = Number(colorOfSourceCard) === 0 || Number(colorOfSourceCard) === 2;
        break;
      default:
        break;
    }

    // 比較數字: cards排放由大到小
    let numOfTarget;
    let isOrderCard;
    if (isInCard) {
      numOfTarget = e.target.id.split('-')[2];
      isOrderCard = Number(numOfTarget) === Number(numOfSourceCard)+1;
    } else { // standard-box排放由小到大
      let lastTargetContainerObject = _.last(newTargetContainer[`${targetBoxIndex}`]);
      numOfTarget = lastTargetContainerObject ? lastTargetContainerObject.num : 0;
      isOrderCard = Number(numOfTarget) === Number(numOfSourceCard)-1;    
    }

    // move to card: 比對target card 是否為最後一張牌
    let cardIndex = e.target.id.split('-')[3];
    let lastCard = _.last(cardRows[`${cardIndex}`].content);
    let isTargetCardLastCard = Number(lastCard.eachColor) === Number(colorOfTargetContainer) && Number(lastCard.num) === Number(numOfTarget);

    // 可放置規則:
    // isInVacancyBox: 只能一張
    // isInStandardBox: 需要同種花色且由小到大
    // isInCard: 需要同顏色花色且由大到小, 只能放置最後一張
    if (isInVacancyBox && newTargetContainer[`${targetBoxIndex}`].length >= 1) {
      this.cancelDefault(e)
    } else if (isInStandardBox && !isSameKindColor){
      this.cancelDefault(e)
    } else if (isInStandardBox && isSameKindColor && !isOrderCard){
      this.cancelDefault(e)
    } else if (isInCard && !isTargetCardLastCard){
      this.cancelDefault(e)
    } else if (isInCard && isSameColor){
      this.cancelDefault(e)
    } else if (isInCard && !isSameColor && !isOrderCard){
      this.cancelDefault(e)
    } else {
      let move = Number(this.state.move);
      move += 1;
      if (arrayName === 'drag') {
        rowData = cardRows[`${rowIndex}`].content.pop();
      } else if (arrayName === 'dropped') {
        rowData = newTargetContainer[`${rowIndex}`].pop();
      }

      if (isInCard) {
        cardRows[`${cardIndex}`].content.push(rowData);
      } else {
        newTargetContainer[`${targetBoxIndex}`] = newTargetContainer[`${targetBoxIndex}`].concat([rowData]);
      }
          
      this.cancelDefault(e)
      this.setState({
        cardRows, 
        targetContainer: newTargetContainer,
        move,
      })
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
      content = _.map(content, function(data, index){
        return {
          eachColor: Math.floor(data/13),
          num: (data + 1) % 13 === 0 ? 13 : (data + 1) % 13, 
          dataIdex: data,
          rowIndex: k,
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

  setSourceContainerId = (sourceContainerId) => {
    this.setState({
      sourceContainerId, 
    })
  }
  
  showTime = () => {
    const timer = moment()
      .startOf('day')
      .add(this.state.time, 'second');
    return timer.format('mm:ss');
  }

  render() {
    return (
      <div className="game-wrap">
        <div className="header">
          <div className="title">FREECELL</div>
          <div className="count-bar">
            <div className="count-time-move">TIME:</div>
            <div className="count-time-move count-num">{this.showTime()}</div>
            <div className="count-time-move">MOVE:</div>
            <div className="count-time-move count-num">{this.state.move}</div>
          </div>
        </div>
        <div className="context">
          <div className="vacancy-box" id="dropped-target-container-0" data-role="drag-drop-container">
          {
            this.state.targetContainer[0].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={0} source={'dropped'} isLastCard={this.state.targetContainer[0].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }       
          </div>
          <div className="vacancy-box" id="dropped-target-container-1" data-role="drag-drop-container">
          {
            this.state.targetContainer[1].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={1} source={'dropped'} isLastCard={this.state.targetContainer[1].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="vacancy-box" id="dropped-target-container-2" data-role="drag-drop-container">
          {
            this.state.targetContainer[2].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={2} source={'dropped'} isLastCard={this.state.targetContainer[2].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="vacancy-box" id="dropped-target-container-3" data-role="drag-drop-container">
          {
            this.state.targetContainer[3].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={3} source={'dropped'} isLastCard={this.state.targetContainer[3].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="standard-box suithearts" id="dropped-target-container-4" data-role="drag-drop-container">
          {
            this.state.targetContainer[4].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={4} source={'dropped'} isLastCard={this.state.targetContainer[4].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="standard-box suitdiamonds" id="dropped-target-container-5" data-role="drag-drop-container">
          {
            this.state.targetContainer[5].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={5} source={'dropped'} isLastCard={this.state.targetContainer[5].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="standard-box suitclubs" id="dropped-target-container-6" data-role="drag-drop-container">
          {
            this.state.targetContainer[6].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={6} source={'dropped'} isLastCard={this.state.targetContainer[6].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="standard-box suitspades" id="dropped-target-container-7" data-role="drag-drop-container">
          {
            this.state.targetContainer[7].map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={7} source={'dropped'} isLastCard={this.state.targetContainer[7].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>

          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[0].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={0} source={'drag'} isLastCard={this.state.cardRows[0].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[1].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={1} source={'drag'} isLastCard={this.state.cardRows[1].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[2].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={2} source={'drag'} isLastCard={this.state.cardRows[2].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[3].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={3} source={'drag'} isLastCard={this.state.cardRows[3].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[4].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={4} source={'drag'} isLastCard={this.state.cardRows[4].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[5].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={5} source={'drag'} isLastCard={this.state.cardRows[5].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[6].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={6} source={'drag'} isLastCard={this.state.cardRows[6].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row" data-role="drag-drop-container">
          {
            this.state.cardRows[7].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={7} source={'drag'} isLastCard={this.state.cardRows[7].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="game-menu">
            <div className="material-icons setting">power_settings_new</div>
            <div className="material-icons setting">pause</div>
            <button className="menu-btn">UNDO</button>
            <div className="material-icons setting">replay</div>
            <div className="material-icons setting">help_outline</div>
          </div>                
        </div>
      </div>
    )
  }

}

export default GameIndex;
