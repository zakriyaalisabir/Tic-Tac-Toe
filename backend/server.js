require('dotenv').config();

const debug = require('debug')('backend:server');

const { models } = require('./src/db/models');

const { Server } = require('./src');
const PORT = process.env.PORT || 8181;

debug('Syncing DB.....');

models
  .sync()
  .then(() => {
    debug('Init Server....');
    Server.listen(PORT, () => {
      console.log(`Application TicTacToe is up on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    debug('DB Sync failed....');
  });
