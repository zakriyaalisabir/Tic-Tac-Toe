const debug = require('debug')('backend:src:routes:game');

const { Router } = require('express');

const { GamesController } = require('../controllers');

const router = Router();

debug('Game Router Init....');

router.get('/', GamesController.getAllGames);
router.post('/', GamesController.postGame);
router.get('/:game_id', GamesController.getGame);
router.put('/:game_id', GamesController.putGame);
router.patch('/:game_id', GamesController.patchGame);
router.delete('/:game_id', GamesController.deleteGame);

module.exports = {
  GameRouter: router
};
