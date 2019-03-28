const express = require('express');
const validations = require('./validations');
const handlers = require('./handlers');

const clubRouter = express.Router();
clubRouter.get('/:id', validations.load, handlers.load);
clubRouter.post('/:id/members', validations.members.create, handlers.members.create);
module.exports = clubRouter;
