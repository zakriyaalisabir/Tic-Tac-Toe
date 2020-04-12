import axios from 'axios';

import { ErrorCode } from './ErrorCodes';
import { BadRequestResult } from './ErrorsResult';

class Http {
  static async get(url, options = { crossDomain: true }) {
    return this._axiosRequest({
      method: 'get',
      url,
      options
    });
  }

  static async post(url, data, options = { crossDomain: true }) {
    return this._axiosRequest({
      method: 'post',
      url,
      data,
      options
    });
  }

  static async patch(url, data, options = { crossDomain: true }) {
    return this._axiosRequest({
      method: 'patch',
      url,
      data,
      options
    });
  }

  static async put(url, data, options = { crossDomain: true }) {
    return this._axiosRequest({
      method: 'put',
      url,
      data,
      options
    });
  }

  static async update(url, data, options = { crossDomain: true }) {
    return this._axiosRequest({
      method: 'put',
      url,
      data,
      options: { ...options, crossDomain: true }
    });
  }

  static async _axiosRequest({ method, url, data, options }) {
    try {
      const response = data
        ? await axios[method](url, data, options)
        : await axios[method](url, options);

      return response.data;
    } catch (error) {
      throw new BadRequestResult(ErrorCode.HttpError, error.message);
    }
  }
}

export { Http };
