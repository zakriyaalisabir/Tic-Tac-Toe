const { runRawQueriesT } = require('../../utils/repo');

const migrationCommands = ['CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'];
const rollbackCommands = [];

module.exports = {
  up: runRawQueriesT(migrationCommands),
  down: runRawQueriesT(rollbackCommands)
};
