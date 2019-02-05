const { Model, QueryBuilder } = require('objection');

class Member extends Model {
  static get tableName() {
    return 'cd_usersdojos';
  }

  static get QueryBuilder() {
    return class extends QueryBuilder {
      softDelete() {
        return this.patch({
          deletedAt: new Date(),
          deleted: 1,
        });
      }
    };
  }
}

module.exports = Member;
