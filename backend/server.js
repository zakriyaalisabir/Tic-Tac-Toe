require('dotenv').config({
  debug: process.env.DEBUG === '*' ? true : false,
  encoding: 'utf-8'
});

const debug = require('debug')('serverjs');

const { Server } = require('./src');
const PORT = process.env.PORT || 8181;

debug('Initiationg Server.....');

Server.listen(PORT, () => {
  debug(`Server is up on http://localhost:${PORT}`);
});
