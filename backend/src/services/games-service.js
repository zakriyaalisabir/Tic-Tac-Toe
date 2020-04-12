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
const { FindWinner } = require('../utils/helpers/find-game-winner');

const repo = new GameRepository(Game);

class GameService {
  static async getList() {
    try {
      const res = await repo.list();
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
        'Error While fetching all Games'
      );
    }
  }

  static async post(data) {
    let transaction;
    try {
      transaction = await createTransaction();
      const res = await repo.create({ ...data }, transaction);
      if (isEmpty(res)) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableEntityResult,
          'Unable to POst Game Obj'
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
        'Error While Posting a Game Obj'
      );
    }
  }

  static async exists(id) {
    try {
      const res = await repo.exists(id);
      if (!res) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableRequest,
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
        'Error While Fetching a Game Obj'
      );
    }
  }

  static async getOne(id) {
    try {
      await GameService.exists(id);
      const res = await repo.get(id);
      if (isEmpty(res)) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableEntityResult,
          'Unable to Get Game Obj'
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
        'Error While fetching a Game Obj'
      );
    }
  }

  static async put(id, { board }) {
    let transaction;
    try {
      await GameService.exists(id);
      transaction = await createTransaction();
      const res = await repo.update(
        { board, id, status: FindWinner(board) },
        transaction
      );
      if (isEmpty(res)) {
        throw new UnprocessableEntityResult(
          ErrorCode.UnprocessableEntityResult,
          'Unable to Update Game Obj'
        );
      }
      await transaction.commit();
      return res;
    } catch (error) {
      debug({ error });
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
        'Error While Updating a Game Obj'
      );
    }
  }

  static async delete(id) {
    let transaction;
    try {
      await GameService.exists(id);
      transaction = await createTransaction();
      await repo.delete(id, transaction);
      await transaction.commit();
      return true;
    } catch (error) {
      debug({ error });
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
        'Error While Deleting a Game Obj'
      );
    }
  }
}

debug('Game Service Init....');

module.exports = { GameService };
