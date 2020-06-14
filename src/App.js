import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  for(let i=1; i<rosterSize+1; i+=12){
      let rowValues = values.slice(i, i+12);
      rows.push(new FighterRow(rowValues));
  }

  return rows;
}

function App() {

  let rows = getRandomRows(80);
  let firstRows = rows.slice(0, rows.length - 2);
  let lastRow = rows[rows.length - 1];
  
  return (
    <div className = "App">
      <Container fluid>
        {firstRows.map(row => <Row>{row.fighters.map(fighter => <Col><img src = {icons[fighter]}/></Col>)}</Row>)}
        <Row>{lastRow.fighters.map(fighter => <Col><img src = {icons[fighter]}/></Col>)}</Row>
      </Container>
    </div>
  );

}

export default App;
