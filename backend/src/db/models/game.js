const debug = require('debug')('backend:src:db:models:game');

const { FindWinner } = require('../../utils/helpers/find-game-winner');

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'Game',
    {
      board: {
        type: DataTypes.STRING,
        required: true
      },
      status: {
        type: DataTypes.ENUM,
        values: ['RUNNING', 'X_WON', 'O_WON', 'DRAW']
      }
    },
    {
      hooks: {
        beforeSave: (gameObj) => {
          gameObj.status = FindWinner(gameObj.board);
          debug({ before: gameObj });
        }
      }
    }
  );
  Game.associate = (models) => {
    // associations can be defined here
  };
  return Game;
};
