import React from 'react';
import Board from './Board';

import { URL, Http, squaresArrToStr } from '../Utils';

const initialGameStatus = 'RUNNING';
const initialGameBoard = '---------';

class Game extends React.Component {
  constructor() {
    super();

    this.game_id = null;

    this.state = {
      board: initialGameBoard,
      game_id: null,
      status: initialGameStatus,
      squares: Array(9).fill(null),
      stepNumber: 0,
      msg: 'Start New Game Now'
    };
  }

  componentDidMount = async () => {
    await this.init();
  };

  init = async () => {
    try {
      const {
        result: { id }
      } = await Http.post(URL, { board: this.state.board });

      console.log({ game_id: id });

      this.game_id = id;

      this.setState({ game_id: id });
    } catch (error) {
      console.log(error);
    }
  };

  updateBoard = async (squares) => {
    const strSquares = squaresArrToStr(squares);

    console.log({ strSquares });

    try {
      const {
        result: { status }
      } = await Http.put(`${URL}/${this.state.game_id}`, {
        board: strSquares
      });

      if (status !== initialGameStatus) {
        console.clear();
      }

      this.setState({ status, stepNumber: this.state.stepNumber++ });
    } catch (error) {
      console.log(error);
    }
  };

  newGame = () => {
    console.clear();
    this.setState({
      board: initialGameBoard,
      status: initialGameStatus,
      squares: Array(9).fill(null),
      stepNumber: 0
    });
  };

  handleClick = (i) => {
    if (this.state.status === initialGameStatus) {
      const marker = this.state.stepNumber % 2 === 0 ? 'X' : 'O';
      const squares = this.state.squares;
      squares[i] = marker;

      this.setState({ squares }, async () => {
        //make api call here for move update
        await this.updateBoard(this.state.squares);

        const newSquares = await this.cpuMove(this.state.squares);

        this.setState({
          squares: newSquares
        });
      });
    }
  };

  cpuMove = async (squares) => {
    const emptySquares = [];
    squares.map((obj, idx) => {
      if (obj === null) {
        emptySquares.push(idx);
      }
      return obj;
    });

    console.log({ emptySquares });

    console.log('before', squares);

    const cpuMovePos =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];

    console.log({ cpuMovePos });

    squares[cpuMovePos] = this.state.stepNumber % 2 === 0 ? 'O' : 'X';

    //make api call here for move update
    await this.updateBoard(squares);

    console.log('after', squares);

    return squares;
  };

  render = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <h6>Game Id : {this.state.game_id}</h6>
          <strong>X = You and O = CPU</strong>
          <div>Game Status : {this.state.status}</div>
          <button onClick={() => this.newGame()}>New Game</button>
          <br />
          {this.state.status !== initialGameStatus ? this.state.msg : null}
        </div>
      </div>
    );
  };
}

export default Game;
