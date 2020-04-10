const debug = require('debug')('backend:src:utils:helpers:jwt-auth');

const jwt = require('jsonwebtoken');

const { UnauthorizedErrorResult, ErrorCode } = require('../errors');
const { jwtSecret } = require('../config');

const AUDIENCE = process.env.AUDIENCE || 'tictactoe';

const issueToken = (data) => {
  const token = jwt.sign({ data }, jwtSecret, {
    expiresIn: 60 * 60, //3600 seconds or 1h
    audience: AUDIENCE
  });

  debug({ token });

  return token;
};

const verifyToken = (token) => {
  try {
    const { data, audience } = jwt.verify(token, jwtSecret);

    if (audience !== AUDIENCE) {
      throw new Error();
    }

    debug({ data, audience });

    return data;
  } catch (error) {
    throw new UnauthorizedErrorResult(
      ErrorCode.InvalidToken,
      'JWT is invalid or missing'
    );
  }
};

module.exports = { issueToken, verifyToken };
