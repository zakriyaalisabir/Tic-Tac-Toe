const debug = require('debug')('backend:src:ctrl:game');

const { HttpStatusCode } = require('../utils/http/codes');
const { ResponseBuilder } = require('../utils/helpers/response-builder');

const { GameService } = require('../services');

class GamesController {
  static async getAllGames(req, res, next) {
    try {
      let games = await GameService.getList();
      debug({ games });

      ResponseBuilder.show(
        res,
        { count: games.length, games },
        HttpStatusCode.Ok
      );
    } catch (error) {
      ResponseBuilder.error(res, error);
    } finally {
      next();
    }
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
    try {
      const {
        params: { game_id: id }
      } = req;
      debug({ id });
      const result = await GameService.getOne(id);
      ResponseBuilder.show(res, result, HttpStatusCode.Ok);
    } catch (error) {
      ResponseBuilder.error(res, error);
    } finally {
      next();
    }
  }

  static async putGame(req, res, next) {
    try {
      const {
        params: { game_id: id },
        body
      } = req;
      debug({ id, body });
      const result = await GameService.put(id, body);
      ResponseBuilder.show(res, result, HttpStatusCode.Ok);
    } catch (error) {
      ResponseBuilder.error(res, error);
    } finally {
      next();
    }
  }

  static async deleteGame(req, res, next) {
    try {
      const {
        params: { game_id: id }
      } = req;
      debug({ id });
      const result = await GameService.delete(id);
      ResponseBuilder.show(res, result, HttpStatusCode.NoContent);
    } catch (error) {
      ResponseBuilder.error(res, error);
    } finally {
      next();
    }
  }
}

debug('Game Ctrl Init.....');

module.exports = { GamesController };
