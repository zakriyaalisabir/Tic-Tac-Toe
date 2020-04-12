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

  static async postGame(req, res, next) {
    try {
      debug(req.body);
      const result = await GameService.post(req.body);
      debug({ result });
      ResponseBuilder.show(res, result, HttpStatusCode.Ok);
    } catch (error) {
      const { body, statusCode } = ResponseBuilder.error(error);
      res.status(statusCode).send(body);
    } finally {
      next();
    }
  }

  static async getGame(req, res, next) {
    res.send('this.getGame');
    next();
  }

  static async putGame(req, res, next) {
    res.send(ResponseBuilder.ok('this.putGame'));
    next();
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
