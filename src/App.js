import React, { Component } from 'react';
import { Row, Col, Button, Layout, Menu } from 'antd';
import './App.css';
import icons from './fighterIcons';

const { Header, Content, Footer} = Layout;

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

    let rows = getRandomRows(78);
    let firstRows = rows.slice(0, rows.length - 1);
    let lastRow = rows[rows.length - 1];

    this.state = {
      rows : rows,
      firstRows : firstRows,
      lastRow : lastRow
    }
  }

  shuffleRows = () => {

    let rows = getRandomRows(78);
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
        <Layout className="layout">
          <Header>
            <div class="logo"><h3>Column Wars</h3></div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">Play</Menu.Item>
              <Menu.Item key="2">Roster</Menu.Item>
              <Menu.Item key="3">HowTo</Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div class="selectionPanels" id="grid">
              {this.state.firstRows.map(row => <Row justify="center">{row.fighters.map(fighter => <Col span={2}><img src = {icons[fighter]} width="50" height ="50"/></Col>)}</Row>)}
            </div>
            <div class="selectionPanels" id="lastCol">
              <h2>Last Row:</h2>
              <Row justify="center">{this.state.lastRow.fighters.map(fighter => <Col span={3}><img src = {icons[fighter]} width="50" height="50"/></Col>)}</Row>
            </div>
            <div class="buttonWrapper">
              <Button type="primary" danger onClick={this.shuffleRows}>Shuffle</Button>
            </div>
          </Content>
          <Footer>
            Column Wars v1.0 Created By Andy Hine 2020
          </Footer>
        </Layout>
        
      </div>   
    );
  }

}

export default App;
