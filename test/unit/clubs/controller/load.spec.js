const sinon = require('sinon');
const proxy = require('proxyquire');

describe('clubs/controller:load', () => {
  let sandbox;
  let queryBuilder;
  let clubsController;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    sandbox.reset();
    queryBuilder = {
      findOne: sandbox.stub(),
    };
    clubsController = proxy('../../../../clubs/controller', {
      './models/Club': queryBuilder,
    });
  });
  describe('load', () => {
    it('should load the club by id', async () => {
      queryBuilder.findOne.resolves({ id: 'd1', name: 'Dojo Test1' });
      const res = await clubsController.load('d1', queryBuilder);
      expect(queryBuilder.findOne).to.have.been.calledOnce.and
        .calledWith({ id: 'd1' });
      expect(res).to.eql({ id: 'd1', name: 'Dojo Test1' });
    });
    it('should throw an error', async () => {
      queryBuilder.findOne.resolves();
      try {
        await clubsController.load('d1', queryBuilder);
      } catch (e) {
        expect(queryBuilder.findOne).to.have.been.calledOnce.and
          .calledWith({ id: 'd1' });
        expect(e.status).to.equal(404);
      }
    });
  });
});
