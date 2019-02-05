const sinon = require('sinon');
const proxy = require('proxyquire');

describe('memberships/controller:delete', () => {
  let sandbox;
  let queryBuilder;
  let memberController;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    sandbox.reset();
    queryBuilder = {
      query: sandbox.stub().returnsThis(),
      where: sandbox.stub().returnsThis(),
      softDelete: sandbox.stub().returnsThis(),
      delete: sandbox.stub().returnsThis(),
    };
    memberController = proxy('../../../../memberships/controller', {
      './models/Member': {
        query: queryBuilder.query,
      },
    });
  });
  describe('hardDelete', () => {
    it('should delete a single membership', async () => {
      const cascade = false;
      const $query = sandbox.stub().returns(queryBuilder);
      const hasChildren = sandbox.stub().returns(true);
      await memberController.delete({ id: 'userId1' }, queryBuilder);
      expect(queryBuilder.where).to.have.been.calledOnce.and.calledWith({ id: 'userId1' });
      expect(queryBuilder.delete).to.have.been.calledOnce;
      expect(queryBuilder.delete.getCall(0)).to.have.been.calledWith();
    });
  });
  describe('softDelete', () => {
    it('should delete a single membership', async () => {
      const $query = sandbox.stub().returns(queryBuilder);
      const hasChildren = sandbox.stub().returns(true);
      await memberController.softDelete({ id: 'userId1' }, queryBuilder);
      expect(queryBuilder.where).to.have.been.calledOnce.and.calledWith({ id: 'userId1' });
      expect(queryBuilder.softDelete).to.have.been.calledOnce;
      expect(queryBuilder.softDelete.getCall(0)).to.have.been.calledWith();
    });
  });
});
