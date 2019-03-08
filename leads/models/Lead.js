const { Model } = require('objection');

class Lead extends Model {
  static get tableName() {
    return 'cd_dojoleads';
  }
}

module.exports = Lead;
