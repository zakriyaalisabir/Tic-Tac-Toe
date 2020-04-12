const debug = require('debug')('backend:src:routes:game');

const { Router } = require('express');

const { GamesController } = require('../controllers');

const router = Router();

debug('Game Router Init....');

router.get('/', GamesController.getAllGames);
router.post('/', GamesController.postGame);
router.get('/:game_id', GamesController.getGame);
router.put('/:game_id', GamesController.putGame);
router.delete('/:game_id', GamesController.deleteGame);

module.exports = {
  GameRouter: router
};
