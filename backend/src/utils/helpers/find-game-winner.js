const GetGameStatus = (gameArr, gameStatus) => {
  const allMovesDone = gameArr.map((move) => (move === '-' ? false : true));
  return allMovesDone ? 'DRAW' : gameStatus;
};

const GameStrToArray = (boardState) => {
  return Array.from(boardState);
};

const FindWinner = (boardState) => {
  const gameArr = GameStrToArray(boardState);

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

  let gameStatus = 'RUNNING';

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (gameArr[a] && gameArr[a] === gameArr[b] && gameArr[a] === gameArr[c]) {
      return gameArr[a] !== '-'
        ? gameArr[a].concat('_WON')
        : GetGameStatus(gameArr, gameStatus);
    }
  }
  return gameStatus;
};

module.exports = { FindWinner };
