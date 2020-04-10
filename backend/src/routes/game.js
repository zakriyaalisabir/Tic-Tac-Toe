const debug = require('debug')('backend:src:routes:board');

const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  debug(req.body);

  next();
});

module.exports = {
  GameRouter: router
};
