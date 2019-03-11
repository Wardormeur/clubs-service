const LeadModel = require('./models/Lead');

class LeadsController {
  static async list(query, builder = LeadModel.query()) {
    return builder
      .where(query);
  }
}

module.exports = LeadsController;
