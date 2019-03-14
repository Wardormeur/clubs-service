const { Model } = require('objection');

class Club extends Model {
  static get tableName() {
    return 'cd_dojos';
  }
}

module.exports = Club;
