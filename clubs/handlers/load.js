const clubsController = require('../controller');
const ClubModel = require('../models/Club');
const builderHandler = require('../../util/builderHandler');

module.exports = [
  builderHandler(ClubModel),
  async (req, res, next) => {
    try {
      return res.send(await clubsController.load(req.params.id, res.locals.qb));
    } catch (e) {
      next(e);
    }
  },
];
