const {
  ErrorCode: { SequelizeDatabaseError, SequelizeValidationError },
  UnprocessableEntityResult,
} = require('../errors');

class SharedRepository {
  constructor(model) {
    this._model = model;
  }

  async exists(email) {
    const data = await this._model.findOne({
      where: { email },
      attributes: ['email'],
      raw: true,
    });

    return data && Object.keys(data).length ? true : false;
  }

  async create(data, transaction, options = {}) {
    try {
      return this._shallowCopy(
        await this._model.create(data, { ...options, transaction })
      );
    } catch (error) {
      this._translateError(error);
    }
  }

  async bulkCreate(data, transaction) {
    try {
      return this._shallowCopy(
        await this._model.bulkCreate(data, { transaction, returning: true })
      );
    } catch (error) {
      this._translateError(error);
    }
  }

  async get(email, options) {
    return this._shallowCopy(
      await this._model.findOne({ where: { email }, ...options })
    );
  }

  async list(where, options = {}) {
    return this._shallowCopy(await this._model.findAll({ where, ...options }));
  }

  async listAndCount(where, options = {}) {
    const data = await this._model.findAndCountAll({ where, ...options });
    data.results = this._shallowCopy(data.results);
    return data;
  }

  async delete(email, transaction) {
    return this._model.destroy({ where: { email }, transaction });
  }

  async deleteMultiple(where = {}, options = {}) {
    return this._model.destroy({ where, ...options });
  }

  async update(data, transaction) {
    if (data.email === undefined) {
      throw new TypeError('Primary key property `id` must be specified');
    }

    const [, updated] = await this._model.update(data, {
      where: { email: data.email },
      returning: true,
      raw: true,
      transaction,
    });

    if (updated.length === 0) {
      // Upper layers are responsible for ensuring that they update entities
      // that actually exist (and also performing the necessary authorization
      // checks), so any manifestations of this error should be considered to
      // be implementation errors. Might need a better exception class though.
      throw new Error(`Entity does not exist: ${data.email}`);
    }

    return updated[0];
  }

  async bulkUpdate(data, where, transaction) {
    await this._model.update(data, { where, transaction });
  }

  /**
   * Clones an object and strips the metadata.
   *
   * Lodash 'clone' performs a deep copy and is not applicable here.
   *
   * @param {object} data - Object to clone.
   *
   * @return {object} Cloned object.
   */
  _shallowCopy(data) {
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Modify error if error is sequelize validation error or sequelize database error
   * then throws unprocessable entity
   * @param {object} error - Sequelize error object
   */
  _translateError(error) {
    if ([SequelizeValidationError, SequelizeDatabaseError].includes(error.name))
      throw new UnprocessableEntityResult(error.name, error.message);
    throw error;
  }
}

module.exports = {
  SharedRepository,
  ...require('./migration'),
  ...require('./transaction'),
};
