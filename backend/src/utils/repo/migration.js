/**
 * Callback to do a db schema / data migration.
 *
 * @callback migrationFunction
 * @param {Object} queryInterface - Sequelize query interface.
 * @param {Object} transaction - Sequelize transaction.
 * @param {Object} sequelize - Sequelize instance.
 *
 * @return {Promise}
 */

/**
 * Wraps a function into a transactional wrapper with a better exceptions logging.
 *
 * To be used in Sequelize migrations that are executed by Sequelize CLI.
 *
 * @param {migrationFunction} fn - Migration function.
 *
 * @return {Promise}
 */
const transactionalMigration = (fn) => {
  return async function (queryInterface, Sequelize) {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      await fn(queryInterface, transaction, Sequelize);
      await transaction.commit();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      console.log(err);
      throw err;
    }
  };
};

/**
 * Returns a thunk that runs given array of SQL commands.
 *
 * @param {Array} queries - Array of Sequelize migration SQL queries.
 *
 * @return {migrationFunction}
 */
const processRawQueries = (queries) => {
  return async function runQueries(queryInterface, transaction) {
    for (const query of queries) {
      await queryInterface.sequelize.query(query, { transaction });
    }
  };
};

/**
 * Runs given array of SQL queries inside of a transaction.
 *
 * @param {Array} queries - Array of Sequelize migration SQL queries.
 *
 * @return {Promise}
 */
const runRawQueriesT = (queries) => {
  return transactionalMigration(processRawQueries(queries));
};

module.exports = {
  runRawQueriesT
};
