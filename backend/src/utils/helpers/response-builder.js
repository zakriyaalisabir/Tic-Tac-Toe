const debug = require('debug')('backend:src:utils:helpers:response-builder');

const { HttpStatusCode } = require('../http/codes');
const {
  ErrorCode,
  ErrorResult,
  BadRequestResult,
  ConfigurationErrorResult,
  ForbiddenErrorResult,
  InternalServerErrorResult,
  NotFoundResult,
  UnauthorizedErrorResult,
  UnprocessableEntityResult,
  GeneralErrorResult
} = require('../errors');

class ResponseBuilder {
  /**
   * Convert error into readable format and respond with it
   * @param error
   * @returns {{headers: {'Access-Control-Allow-Origin': string, 'WWW-Authenticate': string}, body: string, statusCode: number}}
   */
  static translateError(error) {
    if (error instanceof BadRequestResult) {
      return ResponseBuilder.badRequest(error.code, error.description);
    }

    if (error instanceof ForbiddenErrorResult) {
      return ResponseBuilder.forbidden(error.code, error.description);
    }

    if (error instanceof NotFoundResult) {
      return ResponseBuilder.notFound(error.code, error.description);
    }

    if (error instanceof UnprocessableEntityResult) {
      return ResponseBuilder.UnprocessableEntity(error.code, error.description);
    }

    if (error instanceof InternalServerErrorResult) {
      return ResponseBuilder.internalServerError(error.code, error.description);
    }

    if (error instanceof UnauthorizedErrorResult) {
      return ResponseBuilder.unauthorized();
    }

    return ResponseBuilder.generalError(error);
  }

  /**
   * Respond with 400 Bad Request
   * @param code
   * @param description
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: *}}
   */
  static badRequest(code, description) {
    const errorResult = new BadRequestResult(code, description);
    return ResponseBuilder._returnAs(errorResult, HttpStatusCode.BadRequest);
  }

  /**
   * Respond with 503 Service Unavailable Error
   * @param code
   * @param description
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: *}}
   */
  static configurationError(code, description) {
    const errorResult = new ConfigurationErrorResult(code, description);
    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.ServiceUnavailable
    );
  }

  /**
   * Respond with 403 Forbidden
   * @param code
   * @param description
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: *}}
   */
  static forbidden(code, description) {
    const errorResult = new ForbiddenErrorResult(code, description);
    return ResponseBuilder._returnAs(errorResult, HttpStatusCode.Forbidden);
  }

  /**
   * Respond with general 500 Internal Server Error
   * @param error
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: *}}
   */
  static internalServerError(code, description) {
    const errorResult = new InternalServerErrorResult(code, description);
    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.InternalServerError
    );
  }

  /**
   * Respond with custom error and 500 Internal Server Error
   * @param error
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: *}}
   */
  static generalError(error) {
    debug(error.stack);

    const errorResult = new GeneralErrorResult(
      ErrorCode.GeneralError,
      error.message
    );
    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.InternalServerError
    );
  }

  /**
   * Respond with 404 Not Found
   * @param code
   * @param description
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: *}}
   */
  static notFound(code, description) {
    const errorResult = new NotFoundResult(code, description);
    return ResponseBuilder._returnAs(errorResult, HttpStatusCode.NotFound);
  }

  /**
   * Respond with a custom error code and description
   * @param code
   * @param description
   * @returns {{headers: {'Access-Control-Allow-Origin': string}, body: string, statusCode: *}}
   * @constructor
   */
  static UnprocessableEntity(code, description) {
    const errorResult = new UnprocessableEntityResult(code, description);
    return ResponseBuilder._returnAs(errorResult, HttpStatusCode.Unprocessable);
  }

  /**
   * Respond with 422 Not Authorized status code
   * @param result
   * @returns {{headers: {'Access-Control-Allow-Origin': string, 'WWW-Authenticate': string}, body: string, statusCode: number}}
   */
  static unauthorized(result) {
    return {
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'WWW-Authenticate': 'Bearer'
      },
      statusCode: HttpStatusCode.Unauthorized
    };
  }

  /**
   * Return result as an HTTP status code
   * @param result
   * @param statusCode
   * @returns {body: string, statusCode: Number}
   * @private
   */
  static _returnAs(result, statusCode) {
    return {
      body: result,
      statusCode
    };
  }

  /**
   * Return error as an HTTP response
   * @param { res: expressjs response object, error: <any error>}
   * @returns { response : object <any>  || [objects <any>] }
   */
  static error(res, error) {
    const { statusCode, body } = ResponseBuilder.translateError(error);
    return this.show(res, body, statusCode);
  }

  /**
   * Return result as an HTTP response
   * @param { res: expressjs response object, data: any, statusCode: Number}
   * @returns { response : object <any>  || [objects <any>] }
   */
  static show(res, data, statusCode) {
    return res.status(statusCode).send({ result: data });
  }
}

debug('ResponseBuilder Init....');

module.exports = {
  ResponseBuilder
};
