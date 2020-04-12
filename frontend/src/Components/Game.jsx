import React from 'react';
import Board from './Board';

// import B

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor() {
    super();
    
    this.state = {
      game_id: null,
      status: 'RUNNING',
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    //make api call here

    const newSquares = this.cpuMove(squares);

    this.setState({
      history: history.concat([{ squares: newSquares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  cpuMove(squares) {
    const emptySquares = [];
    squares.map((obj, idx) => {
      if (obj === null) {
        emptySquares.push(idx);
      }
      return obj;
    });

    console.log({ emptySquares });

    console.log('before', squares);

    const max = emptySquares[0];
    const min = emptySquares[emptySquares.length - 1];
    const cpuMove = Math.floor(Math.random() * (max - min)) + min;

    console.log({ max, min, cpuMove });

    squares[cpuMove] = this.state.xIsNext ? 'O' : 'X';

    //make api call here

    console.log('after', squares);

    return squares;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = winner + '_WINS';
      console.clear();
    }
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Start New Game';
      return (
        <li key={move}>
          {
            // eslint-disable-next-line
            <a href="#" onClick={() => this.jumpTo(move)}>
              {desc}
            </a>
          }
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <strong>X= You and O = CPU</strong>
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
