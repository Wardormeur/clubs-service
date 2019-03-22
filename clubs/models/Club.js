const { Model } = require('objection');
const Member = require('../../memberships/models/Member');

class Club extends Model {
  static get tableName() {
    return 'cd_dojos';
  }
  static get relationMappings() {
    return {
      owner: {
        relation: Model.HasOneRelation,
        modelClass: Member,
        join: {
          from: 'cd_usersdojos.dojoId',
          to: 'cd_dojos.id',
        },
        modify: {
          owner: 1,
          deleted: 0,
        },
      },
    };
  }
}

module.exports = Club;
