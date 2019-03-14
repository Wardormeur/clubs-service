const express = require('express');
const validations = require('./validations');
const handlers = require('./handlers');

const clubRouter = express.Router();
clubRouter.get('/:id', validations.load, handlers.load);
module.exports = clubRouter;
