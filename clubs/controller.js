const ClubModel = require('./models/Club');
const { ClubNotFound } = require('./errors');

class ClubsController {
  static async load(id, builder = ClubModel.query()) {
    const club = await builder
      .findOne({ id });
    if (!club) throw ClubNotFound;
    return club;
  }
}

module.exports = ClubsController;
