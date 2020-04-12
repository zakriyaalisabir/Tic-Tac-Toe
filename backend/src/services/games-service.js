const debug = require('debug')('backend:src:service:game');

const { models: Game } = require('../db/models');
const {
  BadRequestResult,
  ForbiddenErrorResult,
  GeneralErrorResult,
  UnprocessableEntityResult,
  ErrorCode
} = require('../utils/errors');
const { createTransaction } = require('../utils/repo');
const { GameRepository } = require('../repositories');

class GameService {
  constructor() {
    this.repo = new GameRepository(Game);
  }

  static async getList() {
    return ['list'];
  }

  static async post(obj) {
    let transaction;
    try {
      const data = {...obj,};
      transaction = await createTransaction();
      // const res = this.repo.create(data, transaction);
      // await transaction.commit();
      return data;
    } catch (error) {
      if (transaction) await transaction.rollback();
      if (
        error instanceof BadRequestResult ||
        error instanceof ForbiddenErrorResult
      ) {
        throw error;
      }
      throw new GeneralErrorResult(
        ErrorCode.GeneralError,
        'Error While Posting a Game Move'
      );
    }
  }

  static async getOne(obj) {
    return obj;
  }

  static async put(obj) {
    return obj;
  }

  static async patch(obj) {
    return obj;
  }

  static async delete(obj) {
    return obj;
  }
}

debug('Game Service Init....');

module.exports = { GameService };
