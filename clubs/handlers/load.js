const clubsController = require('../controller');

module.exports = [
  async (req, res, next) => {
    try {
      return res.send(await clubsController.load(req.params.id, res.locals.qb));
    } catch (e) {
      next(e);
    }
  },
];
