const debug = require('debug')('backend:src:ctrl:game');

class GamesController {
  constructor() {}
  static getAllGames(req, res, next) {
    res.send('this.getAllGames');
    next();
  }

  static postGame(req, res, next) {
    res.send('this.postGame');
    next();
  }

  static getGame(req, res, next) {
    res.send('this.getGame');
    next();
  }

  static putGame(req, res, next) {
    res.send('this.putGame');
    next();
  }

  static patchGame(req, res, next) {
    res.send('this.patchGame');
    next();
  }

  static deleteGame(req, res, next) {
    res.send('this.deleteGame');
    next();
  }
}

debug('Game Ctrl Init.....');

module.exports = { GamesController };
