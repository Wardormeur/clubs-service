const express = require('express');
const validations = require('./validations');
const handlers = require('./handlers');

const leadRouter = express.Router();
leadRouter.get('/', validations.list, handlers.list);
module.exports = leadRouter;
