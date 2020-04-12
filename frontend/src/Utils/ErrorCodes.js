const ErrorCode = {
  AccessDenied: 'ACCESS_DENIED',
  GeneralError: 'GENERAL_ERROR',
  IdMismatch: 'ID_MISMATCH',
  JsonParseError: 'JSON_PARSE_ERROR',
  JsonValidationError: 'JSON_VALIDATION_ERROR',
  ValidationError: 'VALIDATION_ERROR',
  InternalServerError: 'INTERNAL_SERVER_ERROR',
  MissingId: 'MISSING_ID',
  MissingBody: 'MISSING_BODY',
  InvalidList: 'INVALID_LIST',
  TransactionNotCreated: 'TRANSACTION_NOT_CREATED',
  HttpError: 'HTTP_ERROR',
  InvalidToken: 'INVALID_TOKEN',
  InvalidId: 'INVALID_ID',
  InvalidData: 'INVALID_DATA',
  UnknownType: 'UNKNOWN_TYPE',
  DatabaseConnectionRefused: 'DATABASE_CONNECTION_REFUSED',
  SequelizeValidationError: 'SequelizeValidationError',
  SequelizeDatabaseError: 'SequelizeDatabaseError',
  AssetNotFound: 'ASSET_NOT_FOUND',
  CategoryMismatch: 'CATEGORY_MISMATCH',
  ItemNotFound: 'ITEM_NOT_FOUND',
  UnprocessableRequest: 'UNPROCESSABLE_REQUEST',
  UserAlreadyRegistered: 'USER_ALREADY_REGISTERED'
};

export { ErrorCode };
