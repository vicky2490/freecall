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
    let data = e.dataTransfer.getData('text/plain').split('-');
    let arrayName = data[0];
    let rowIndex = data[3];
    let rowData;
    let cardRows = this.state.cardRows;
    let newTargetContainer = _.clone(this.state.targetContainer);

    if (arrayName === 'drag') {
      rowData = cardRows[`${rowIndex}`].content.pop();
    } else if (arrayName === 'dropped') {
      rowData = newTargetContainer[`${rowIndex}`].pop();
    }
    let targetData = e.target.id.split('-');
    let targetBoxIndex = targetData[3];
    newTargetContainer[`${targetBoxIndex}`] = newTargetContainer[`${targetBoxIndex}`].concat([rowData]);
        
    this.cancelDefault(e)
    this.setState({
      cardRows, 
      targetContainer: newTargetContainer,
    })
    
    
    // if (this.id !== this.state.sourceContainerId) {
    
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

          <div className="card-row">
          {
            this.state.cardRows[0].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={0} source={'drag'} isLastCard={this.state.cardRows[0].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[1].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={1} source={'drag'} isLastCard={this.state.cardRows[1].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[2].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={2} source={'drag'} isLastCard={this.state.cardRows[2].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[3].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={3} source={'drag'} isLastCard={this.state.cardRows[3].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[4].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={4} source={'drag'} isLastCard={this.state.cardRows[4].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[5].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={5} source={'drag'} isLastCard={this.state.cardRows[5].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
          {
            this.state.cardRows[6].content.map((data, i) => <Card key={i} cardRows={data} p={i} rowIndex={6} source={'drag'} isLastCard={this.state.cardRows[6].content.length === (i+1)} setSourceContainerId={(l) => this.setSourceContainerId(l)}/>)
          }
          </div>
          <div className="card-row">
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