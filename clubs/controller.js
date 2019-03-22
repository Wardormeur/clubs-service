const ClubModel = require('./models/Club');
const { ClubNotFound } = require('./errors');

class ClubsController {
  static async load(id, related, builder = ClubModel.query()) {
    const club = await builder
      .allowEager('owner')
      .eager(related)
      .findOne({ id });
    if (!club) throw ClubNotFound;
    return club;
  }
}

module.exports = ClubsController;
