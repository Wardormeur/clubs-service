const membershipsController = require('../controller');

module.exports = [
  async (req, res, next) => {
    const { id } = req.params;
    const { userType } = req.body;
    try {
      const membership = await membershipsController.update(id, userType);
      return res.send(membership);
    } catch (e) {
      return next(e);
    }
  },
];
