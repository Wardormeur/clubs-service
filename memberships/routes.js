const express = require('express');
const validations = require('./validations');
const handlers = require('./handlers');

const memberRouter = express.Router();
// For userId
memberRouter.delete('/:id', validations.delete, handlers.delete);

const membershipRouter = express.Router();
// For membershipId
membershipRouter.delete('/:id', validations.delete, handlers.delete);
module.exports = {
  members: memberRouter,
  memberships: membershipRouter,
};
