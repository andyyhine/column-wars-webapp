import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import './App.css';
import icons from './fighterIcons';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

class FighterRow {
  constructor(fighters) {
      this.fighters = fighters;
  }
}

//always 7 rows, 6 of 12 (72) then the rest on row 7
function getRandomRows(rosterSize) {

  let values = Array.from(Array(rosterSize), (_, index) => index + 1)
  shuffle(values);

  let rows = [];

  for(let i=0; i<rosterSize+1; i+=12){
      let rowValues = values.slice(i, i+12);
      rows.push(new FighterRow(rowValues));
  }

  return rows;
}

class App extends Component{

  constructor(props) {
    super(props);

    let rows = getRandomRows(77);
    let firstRows = rows.slice(0, rows.length - 1);
    let lastRow = rows[rows.length - 1];

    this.state = {
      rows : rows,
      firstRows : firstRows,
      lastRow : lastRow
    }
  }

  shuffleRows = () => {

    let rows = getRandomRows(77);
    let firstRows = rows.slice(0, rows.length - 1);
    let lastRow = rows[rows.length - 1];

    this.setState({
      rows : rows,
      firstRows : firstRows,
      lastRow : lastRow
    })
  }

  render() {

    return (
      <div className = "App">
        <div class="selectionPanels" id="grid">
          {this.state.firstRows.map(row => <Row justify="center">{row.fighters.map(fighter => <Col span={2}><img src = {icons[fighter]} width="50" height ="50"/></Col>)}</Row>)}
        </div>
        <div class="selectionPanels" id="lastCol">
            <h2>Last Row:</h2>
            <Row justify="center">{this.state.lastRow.fighters.map(fighter => <Col span={3}><img src = {icons[fighter]} width="50" height="50"/></Col>)}</Row>
          </div>
        <div>
            <Button type="primary" danger onClick={this.shuffleRows}>Shuffle</Button>
        </div>
      </div>   
    );
  }

}

export default App;
