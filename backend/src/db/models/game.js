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
    {}
  );
  Game.associate = (models) => {
    // associations can be defined here
  };
  return Game;
};
