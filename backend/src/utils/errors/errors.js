class ErrorResult extends Error {
  constructor(code, description) {
    super(description);
    this.code = code;
    this.description = description;
  }
}

class BadRequestResult extends ErrorResult {}

class ConfigurationErrorResult extends ErrorResult {}

class ForbiddenErrorResult extends ErrorResult {}

class InternalServerErrorResult extends ErrorResult {}

class GeneralErrorResult extends ErrorResult {}

class NotFoundResult extends ErrorResult {}

class UnauthorizedErrorResult extends ErrorResult {}

class UnprocessableEntityResult extends ErrorResult {}

module.exports = {
  ErrorResult,
  BadRequestResult,
  ConfigurationErrorResult,
  ForbiddenErrorResult,
  InternalServerErrorResult,
  NotFoundResult,
  UnauthorizedErrorResult,
  UnprocessableEntityResult,
  GeneralErrorResult,
};
