const memberController = require('../../memberships/controller');
const clubController = require('../controller');

module.exports = [
  // If usersdojos was using a foreign key for the dojo table
  // we wouldn't have to do that
  async (req, res, next) => {
    const dojoId = req.params.id;
    try {
      await clubController.load(dojoId);
      next();
    } catch (e) {
      next(e);
    }
  },
  async (req, res, next) => {
    const { userId, userType } = req.body;
    const { id: dojoId } = req.params;
    try {
      return res.send(await memberController.create(userId, dojoId, userType));
    } catch (e) {
      next(e);
    }
  },
];
