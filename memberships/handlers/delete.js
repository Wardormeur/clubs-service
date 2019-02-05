const membershipsController = require('../controller');

module.exports = [
  async (req, res, next) => {
    const deleteMemberships = req.body.soft ? membershipsController.softDelete : membershipsController.delete;
    const deleted = await deleteMemberships({ userId: req.params.id });
    if (deleted) {
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  },
];
