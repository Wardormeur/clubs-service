const proxy = require('proxyquire');

describe('MemberModel', () => {
  const sandbox = sinon.createSandbox();
  let MemberModel;
  beforeEach(() => {
    sandbox.reset();
    MemberModel = proxy('../../../../memberships/models/Member', {
      objection: {
        Model: class { },
        QueryBuilder: class { },
      },
    });
  });
  describe('softDelete', () => {
    it('should define softDelete', () => {
      const qB = new MemberModel.QueryBuilder();
      expect(qB.softDelete).to.be.an('function');
    });
    it('should call patch', async () => {
      const qB = new MemberModel.QueryBuilder();
      qB.patch = sandbox.stub();
      await qB.softDelete();
      expect(qB.patch).to.have.been.calledOnce.and.calledWith({
        deletedAt: sinon.match.date,
        deleted: 1,
      });
    });
  });
});
