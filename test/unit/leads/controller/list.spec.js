const sinon = require('sinon');
const proxy = require('proxyquire');

describe('leads/controller:list', () => {
  let sandbox;
  let queryBuilder;
  let leadsController;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    sandbox.reset();
    queryBuilder = {
      query: sandbox.stub().returnsThis(),
      where: sandbox.stub().returnsThis(),
    };
    leadsController = proxy('../../../../leads/controller', {
      './models/Lead': {
        query: queryBuilder.query,
      },
    });
  });
  describe('list', () => {
    it('should list leads with custom query', async () => {
      await leadsController.list({ userId: 'userId1' }, queryBuilder);
      expect(queryBuilder.where).to.have.been.calledOnce.and.calledWith({ userId: 'userId1' });
    });
  });
});
