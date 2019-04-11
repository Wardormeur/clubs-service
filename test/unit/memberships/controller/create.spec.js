const sinon = require('sinon');
const proxy = require('proxyquire');

describe('memberships/controller:create', () => {
  let sandbox;
  let queryBuilder;
  let MemberClass;
  let constr;
  let memberController;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    sandbox.reset();
    queryBuilder = {
      findOne: sandbox.stub(),
      insert: sandbox.stub().returnsThis(),
      returning: sandbox.stub().returnsThis(),
    };
    MemberClass = function () {
      return {
        $query: () => queryBuilder,
      };
    };
    MemberClass.query = () => queryBuilder;
    constr = sinon.spy(MemberClass);
    memberController = proxy('../../../../memberships/controller', {
      './models/Member': constr,
    });
  });
  describe('create', () => {
    it('should create a new membership and save it', async () => {
      queryBuilder.findOne.resolves();
      await memberController.create('u1', 'd1', 'champion');
      expect(constr).to.have.been.calledWith('u1', 'd1', 'champion');
      expect(queryBuilder.insert).to.have.been.calledOnce;
      expect(queryBuilder.returning).to.have.been.calledOnce;
    });
    it('should not create a membership if it exists', async () => {
      queryBuilder.findOne.resolves({ id: 'm1' });
      try {
        await memberController.create('u1', 'd1', 'champion');
      } catch (e) {
        expect(constr).to.not.have.been.called;
        expect(e.status).to.equal(400);
      }
    });
  });
});
