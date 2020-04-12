import React, { Component } from 'react';

import Game from '../Game';

import logo from '../../logo.svg';
import './App.css';
import './TicTacToe.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TicTacToe Game</h2>
        </div>
        <div className="App-intro">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
