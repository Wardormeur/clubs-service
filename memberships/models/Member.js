const { Model, QueryBuilder } = require('objection');
const { uniqBy } = require('lodash');
const uuid = require('uuid/v4');

class Member extends Model {
  constructor(userId, dojoId, userType) {
    super();
    if (userId && dojoId && userType) {
      this.id = uuid();
      this.userId = userId;
      this.dojoId = dojoId;
      this.addRole(userType);
    }
  }
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
  static get permissions() {
    return {
      champion: [
        { title: 'Dojo Admin', name: 'dojo-admin' },
        { title: 'Ticketing Admin', name: 'ticketing-admin' },
      ],
      mentor: [{ title: 'Ticketing Admin', name: 'ticketing-admin' }],
      'parent-guardian': [],
      'attendee-o13': [],
      'attendee-u13': [],
    };
  }
  hasRole(userType) {
    if (!this.userTypes) return false;
    return this.userTypes.indexOf(userType) > -1;
  }
  addRole(userType) {
    if (!this.userTypes) this.userTypes = [];
    if (!this.userPermissions) this.userPermissions = [];
    this.userTypes.push(userType);
    this.userPermissions = uniqBy(this.userPermissions.concat(Member.permissions[userType]), 'name');
  }
}

module.exports = Member;
