const sinon = require('sinon');
const proxy = require('proxyquire');

describe('memberships/controller:update', () => {
  let sandbox;
  let queryBuilder;
  let memberController;
  let MemberClass;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    sandbox.reset();
    MemberClass = {
      hasRole: sandbox.stub(),
      addRole: sandbox.stub(),
    };
    queryBuilder = {
      returning: sandbox.stub().returnsThis(),
      findOne: sandbox.stub().returns(MemberClass),
      update: sandbox.stub().returnsThis(),
    };
    memberController = proxy('../../../../memberships/controller', {
      './models/Member': MemberClass,
    });
  });
  describe('update', () => {
    it('should add a new role to an existing membership', async () => {
      MemberClass.hasRole.returns(false);
      await memberController.update('u1', 'champion', queryBuilder);
      expect(queryBuilder.findOne).to.have.been.calledOnce.and
        .calledWith({ id: 'u1' });
      expect(queryBuilder.update).to.have.been.calledOnce.and
        .calledWith({ id: 'u1', userTypes: undefined, userPermissions: undefined });
      expect(queryBuilder.returning).to.have.been.calledOnce;
    });
    it('should throw if the role exists already', async () => {
      MemberClass.hasRole.returns(true);
      try {
        await memberController.update('u1', 'champion', queryBuilder);
      } catch (e) {
        expect(queryBuilder.findOne).to.have.been.calledOnce.and
          .calledWith({ id: 'u1' });
        expect(queryBuilder.update).to.not.have.been.called;
        expect(e.status).to.equal(400);
      }
    });
  });
});
