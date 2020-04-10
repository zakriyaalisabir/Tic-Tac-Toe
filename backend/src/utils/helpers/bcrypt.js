const debug = require('debug')('src:utils:helpers:bcryptjs');

const bcrypt = require('bcryptjs');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {string} password - Plain text password.
 * @param {number} rounds - Number of rounds for salt generation.
 * @returns {string} string - encrypted password
 */
const encrypt = (password, rounds = 10) => {
  debug({ password });
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(rounds));
  debug({ hash });
  return hash;
};

/**
 * compare passwrod with its salt
 * @function
 * @param {number} password - Plain text password.
 * @returns {boolean} boolean -True or False
 */
const decrypt = (password, digest) => {
  return bcrypt.compareSync(password, digest);
};

module.exports = { encrypt, decrypt };
