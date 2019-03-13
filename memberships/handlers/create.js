const membershipsController = require('../controller');

module.exports = [
  async (req, res, next) => {
    const { userId, userType, dojoId } = req.body;
    const membership = await membershipsController.create(userId, dojoId, userType);
    return res.send(membership);
  },
];
