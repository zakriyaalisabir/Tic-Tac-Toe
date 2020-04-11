const { InternalServerErrorResult, ErrorCode } = require('../errors');

const { models } = require('../../db/models');

const createTransaction = async () => {
  try {
    return await models.transaction();
  } catch (error) {
    throw new InternalServerErrorResult(
      ErrorCode.TransactionNotCreated,
      'Transaction is not created!'
    );
  }
};

module.exports = { createTransaction };
