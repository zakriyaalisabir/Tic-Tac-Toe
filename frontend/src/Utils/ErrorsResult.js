class ErrorResult extends Error {
  constructor(code, description) {
    super(description);
    this.code = code;
    this.description = description;
  }
}

class BadRequestResult extends ErrorResult {}

export { BadRequestResult };
