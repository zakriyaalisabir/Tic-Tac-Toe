const { SharedRepository } = require('../utils/repo');

class GameRepository extends SharedRepository {
  constructor(model) {
    super(model);
  }
}

module.exports = { GameRepository };
