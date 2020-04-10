const swaggerUi = require('swagger-ui-express');
const express = require('express');
const { Router } = require('express');

const swaggerDocument = require('../docs/api.yaml');

const app = express();
const router = Router();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

module.exports = { Server: app };
