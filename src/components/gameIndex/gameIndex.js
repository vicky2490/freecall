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
      sourceContainerId: '',
      targetContainer: [[],[],[],[],[],[],[],[]],
    } 
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
    console.log('this.state.sourceContainerId', this.state.sourceContainerId);
    let data = this.state.sourceContainerId.split('-');
    let rowIndex = data[3];
    
    // TODO: dropped card in which array
    let cardRows = this.state.cardRows;
    let rowData = cardRows[`${rowIndex}`].content.pop();
    console.log('e.target.id', e.target.id);
    
    let targetData = e.target.id.split('-');
    let targetBoxIndex = targetData[2];
    let newTargetContainer = _.clone(this.state.targetContainer);
    
    newTargetContainer[`${targetBoxIndex}`] = this.state.targetContainer[`${targetBoxIndex}`].concat([rowData]);
        
    this.cancelDefault(e)
    this.setState({
      cardRows, 
      targetContainer: newTargetContainer,
    })
    
    
    // if (this.id !== this.state.sourceContainerId) {
    let id = e.dataTransfer.getData('text/plain')
    
    // }
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
          <div className="vacancy-box" id="target-container-0" data-role="drag-drop-container">
          {
            this.state.targetContainer[0].map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.targetContainer[0].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }       
          </div>
          <div className="vacancy-box" id="target-container-1" data-role="drag-drop-container">
          {
            this.state.targetContainer[1].map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.targetContainer[1].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="vacancy-box" id="target-container-2" data-role="drag-drop-container">
          {
            this.state.targetContainer[2].map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.targetContainer[2].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="vacancy-box" id="target-container-3" data-role="drag-drop-container">
          {
            this.state.targetContainer[3].map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.targetContainer[3].length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          } 
          </div>
          <div className="standard-box suithearts" id="target-container-4"></div>
          <div className="standard-box suitdiamonds" id="target-container-5"></div>
          <div className="standard-box suitclubs" id="target-container-6"></div>
          <div className="standard-box suitspades" id="target-container-7"></div>

          <div className="card-row">
          {
            this.state.cardRows[0].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[0].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[1].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[1].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[2].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[2].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[3].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[3].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[4].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[4].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[5].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[5].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[6].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[6].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[7].content.map((data, i) => <Card key={i} cardRows={data} p={i} isLastCard={this.state.cardRows[7].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
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