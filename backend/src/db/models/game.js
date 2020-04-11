module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'Game',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      bio: DataTypes.TEXT
    },
    {}
  );
  Game.associate = function (models) {
    // associations can be defined here
  };
  return Game;
};
