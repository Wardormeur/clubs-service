const MemberModel = require('./models/Member');

class MembershipsController {
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
