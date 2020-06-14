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

class Column {
  constructor(fighters) {
      this.fighters = fighters;
  }
}

function getRandomColumns(rosterSize) {

  let values = Array.from(Array(rosterSize), (_, index) => index + 1)
  shuffle(values);

  let columns = [];

  for(let i=1; i<rosterSize+1; i+=6){
      let columnValues = values.slice(i, i+6);
      columns.push(new Column(columnValues));
  }

  //combine values of last two columns if they need to be inflated
  if(columns.length == 14){
      let col1 = columns[12].fighters;
      let col2 = columns[13].fighters;
      let allFighters = col1.concat(col2);
      columns.splice(-2);
      columns.push(new Column(allFighters));
  }

  return columns;
}

function App() {

    let columns = getRandomColumns(80);

    let needsBottom = columns[columns.length - 1].fighters.length > 6

    if(needsBottom){

      let firstColumns = columns.slice(0, columns.length - 2);
      let lastColumn = columns[columns.length - 1];

      return (
        <div className = "App">
          {firstColumns.map(column => <div class = "column">{column.fighters.join("\n")}</div>)}
          <br></br>
          <br></br>
          <br></br>
          <img src = {icons[1]}/>
          <img src = {icons[64]}/>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div class = "bottomColumn">
            {lastColumn.fighters.join("  ")}
          </div>
        </div>
      );
    }

    return (
      <div className="App">
      {columns.map(column => <div class = "column">{column.fighters.join("\n")}</div>)}
      </div>
    );
}

export default App;
