const MemberModel = require('./models/Member');
const { MembershipExists } = require('./errors');

class MembershipsController {
  static async create(userId, dojoId, userType) {
    // If only we had a unique clause on those 2 fields...
    const currentMembership = await MemberModel.query().findOne({ userId, dojoId });
    if (currentMembership) {
      throw MembershipExists;
    }
    const membership = new MemberModel(userId, dojoId, userType);
    return membership.$query().insert().returning('*');
  }
  // You shouldn't update the userId or the DojoId
  // They represent a different membership
  static async update(id, userType, builder = MemberModel.query()) {
    const currentMembership = await builder.findOne({ id });
    if (currentMembership.hasRole(userType)) throw MembershipExists;
    currentMembership.addRole(userType);
    return builder.update({ id, userTypes: currentMembership.userTypes, userPermissions: currentMembership.userPermissions }).returning('*');
  }
  static async delete(query, builder = MemberModel.query()) {
    return builder
      .where(query)
      .delete();
  }

  static async softDelete(query, builder = MemberModel.query()) {
    return builder
      .where(query)
      .softDelete();
  }
}

module.exports = MembershipsController;
