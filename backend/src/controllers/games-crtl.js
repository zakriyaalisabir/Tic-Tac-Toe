const debug = require('debug')('backend:src:ctrl:game');

const { HttpStatusCode } = require('../utils/http/codes');
const { ResponseBuilder } = require('../utils/helpers/response-builder');

const { GameService } = require('../services');

class GamesController {
  static async getAllGames(req, res, next) {
    const { body, statusCode } = ResponseBuilder.ok(567809);
    res.status(statusCode).send(body);
    next();
  }

  static async postGame({ body }, res, next) {
    try {
      debug({ body });
      const result = await GameService.post(body);
      debug({ result });
      ResponseBuilder.show(res, result, HttpStatusCode.Ok);
    } catch (error) {
      ResponseBuilder.error(res, error);
    } finally {
      next();
    }
  }

  static async getGame(req, res, next) {
    res.send('this.getGame');
    next();
  }

  static async putGame(req, res, next) {
    try {
      const {
        params: { game_id: id },
        body
      } = req;
      debug({ id, body });
      const result = await GameService.put(body);
      debug({ result });
      ResponseBuilder.show(res, result, HttpStatusCode.Ok);
    } catch (error) {
      ResponseBuilder.error(res, error);
    } finally {
      next();
    }
  }

  static async patchGame(req, res, next) {
    res.send('this.patchGame');
    next();
  }

  static async deleteGame(req, res, next) {
    res.send('this.deleteGame');
    next();
  }
}

debug('Game Ctrl Init.....');

module.exports = { GamesController };
