const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const config = require('../../utils/config')[process.env.NODE_ENV];

const _ = require('lodash');

const sequelizeExtraParams = {
  sync: { force: false },
  host: config.host,
  logging: config.logging,
  schema: config.schema,
  dialect: 'postgres',
  port: config.port,
  pool: config.pool,
  define: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: false
  }
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  sequelizeExtraParams
);

const models = {};

// Load all models into db object
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    models[_.snakeCase(_.lowerCase(model.name))] = model; // lowercase backup
  });

const keys = Object.keys(models);
keys.forEach((modelName) => {
  models[_.upperFirst(_.camelCase(modelName))] = models[modelName];
});

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

if (!global.connection) {
  global.connection = {};
}
const connectDB = async () => {
  if (global.connection.isConnected) {
    // console.log('=> Using existing connection.');
    return sequelize;
  }
  await sequelize.authenticate();
  // console.log('=> Created a new connection.');
  // eslint-disable-next-line require-atomic-updates
  global.connection.isConnected = true;
  return sequelize;
};

const disconnectDB = async () => {
  await sequelize.close();
  return sequelize;
};

module.exports = {
  connectDB,
  disconnectDB,
  models,
  sequelize
};
