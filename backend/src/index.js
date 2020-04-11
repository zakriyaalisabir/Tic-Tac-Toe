const express = require('express');
const path = require('path');

const { GameRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

app.use('/game', GameRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = { Server: app };
