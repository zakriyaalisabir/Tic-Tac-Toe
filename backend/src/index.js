const debug = require('debug')('src:indexjs');

const express = require('express');

const { GameRouter } = require('./routes');

const app = express();

debug('Init Server....');

app.use(express.urlencoded({ extended: true }));
app.use('/game', GameRouter);

app.get('/', (req, res) => {
  res.json({ foo: 'bar' });
});

module.exports = { Server: app };
