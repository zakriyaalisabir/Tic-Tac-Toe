const axios = require('axios');
const { BadRequestResult, ErrorCode } = require('../../../../backend/src/utils/errors');

class Http {
  static async get(url, options) {
    return this._axiosRequest({ method: 'get', url, options });
  }

  static async post(url, data, options) {
    return this._axiosRequest({ method: 'post', url, data, options });
  }
  static async patch(url, data, options) {
    return this._axiosRequest({ method: 'patch', url, data, options });
  }

  static async update(url, data, options) {
    return this._axiosRequest({ method: 'put', url, data, options });
  }

  static async _axiosRequest({ method, url, data, options }) {
    try {
      const response = data
        ? await axios[method](url, data, options)
        : await axios[method](url, options);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        throw new BadRequestResult(ErrorCode.HttpError, error.response.data);
      throw new BadRequestResult(ErrorCode.HttpError, error.message);
    }
  }
}

module.exports = {
  Http,
  ...require('./http-status-codes'),
};
