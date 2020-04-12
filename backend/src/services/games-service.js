const debug = require('debug')('backend:src:service:game');

const { isEmpty } = require('lodash');

const {
  models: { Game }
} = require('../db/models');
const {
  BadRequestResult,
  ForbiddenErrorResult,
  GeneralErrorResult,
  UnprocessableEntityResult,
  InternalServerErrorResult,
  ErrorCode
} = require('../utils/errors');
const { createTransaction } = require('../utils/repo');
const { GameRepository } = require('../repositories');

const repo = new GameRepository(Game);

class GameService {
  static async getList() {
    return ['list'];
  }

  static async post(data) {
    let transaction;
    try {
      transaction = await createTransaction();
      const res = await repo.create({ ...data }, transaction);
      if (isEmpty(res)) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableEntityResult,
          'Unable to POst Game Move'
        );
      }
      await transaction.commit();
      return res;
    } catch (error) {
      if (transaction) await transaction.rollback();
      if (
        error instanceof BadRequestResult ||
        error instanceof ForbiddenErrorResult ||
        error instanceof UnprocessableEntityResult ||
        error instanceof InternalServerErrorResult
      ) {
        throw error;
      }
      throw new GeneralErrorResult(
        ErrorCode.GeneralError,
        'Error While Posting a Game Move'
      );
    }
  }

  static async exists(id) {
    try {
      const res = await repo.exists(id);
      if (isEmpty(res)) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableEntityResult,
          `No Game Obj exists with the provided Id ${id}`
        );
      }
      return res;
    } catch (error) {
      if (
        error instanceof BadRequestResult ||
        error instanceof ForbiddenErrorResult ||
        error instanceof UnprocessableEntityResult ||
        error instanceof InternalServerErrorResult
      ) {
        throw error;
      }
      throw new GeneralErrorResult(
        ErrorCode.GeneralError,
        'Error While Updating a Game Move'
      );
    }
  }

  static async getOne(data) {
    let transaction;
    try {
      transaction = await createTransaction();
      const res = await repo.get({ ...data }, transaction);
      if (isEmpty(res)) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableEntityResult,
          'Unable to Update Game Move'
        );
      }
      await transaction.commit();
      return res;
    } catch (error) {
      if (transaction) await transaction.rollback();
      if (
        error instanceof BadRequestResult ||
        error instanceof ForbiddenErrorResult ||
        error instanceof UnprocessableEntityResult ||
        error instanceof InternalServerErrorResult
      ) {
        throw error;
      }
      throw new GeneralErrorResult(
        ErrorCode.GeneralError,
        'Error While Updating a Game Move'
      );
    }
  }

  static async put(id, data) {
    let transaction;
    try {
      await GameService.exists(id);
      transaction = await createTransaction();
      const res = await repo.update({ ...data }, transaction);
      if (isEmpty(res)) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableEntityResult,
          'Unable to Update Game Move'
        );
      }
      await transaction.commit();
      return res;
    } catch (error) {
      console.log(error);
      if (transaction) await transaction.rollback();
      if (
        error instanceof BadRequestResult ||
        error instanceof ForbiddenErrorResult ||
        error instanceof UnprocessableEntityResult ||
        error instanceof InternalServerErrorResult
      ) {
        throw error;
      }
      throw new GeneralErrorResult(
        ErrorCode.GeneralError,
        'Error While Updating a Game Move'
      );
    }
  }

  static async delete(obj) {
    return obj;
  }
}

debug('Game Service Init....');

module.exports = { GameService };
