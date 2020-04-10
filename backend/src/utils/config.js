require('dotenv').config();

const sysUser = {
  user: process.env.SYS_USER,
  pass: process.env.SYS_PASS
};

const jwtSecret = process.env.SECRET;

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_SCHEMA,
  DB_DIALECT,
  DB_LOGGING,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_POOL_IDLE
} = process.env;

const config = {
  username: DB_USER || 'postgres',
  password: DB_PASS || 'lahore',
  database: DB_NAME || 'postgres',
  schema: DB_SCHEMA || 'estore',
  host: DB_HOST || 'localhost',
  port: DB_PORT || 5432,
  dialect: DB_DIALECT || 'postgres',
  logging: DB_LOGGING === 'true',
  pool: {
    min: DB_POOL_MIN || 0,
    max: parseInt(DB_POOL_MAX) || 1,
    idle: DB_POOL_IDLE || 10000
  }
};

module.exports = {
  jwtSecret,
  sysUser,
  development: config,
  test: config,
  production: config
};
