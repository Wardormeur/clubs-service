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
      allowEager: sandbox.stub().returnsThis(),
      eager: sandbox.stub().returnsThis(),
      findOne: sandbox.stub(),
    };
    clubsController = proxy('../../../../clubs/controller', {
      './models/Club': queryBuilder,
    });
  });
  describe('load', () => {
    it('should load the club by id', async () => {
      queryBuilder.findOne.resolves({ id: 'd1', name: 'Dojo Test1' });
      const res = await clubsController.load('d1', undefined, queryBuilder);
      expect(queryBuilder.eager).to.have.been.calledOnce.and
        .calledWith(undefined);
      expect(queryBuilder.findOne).to.have.been.calledOnce.and
        .calledWith({ id: 'd1' });
      expect(res).to.eql({ id: 'd1', name: 'Dojo Test1' });
    });
    it('should set a related during loading', async () => {
      queryBuilder.findOne.resolves({ id: 'd1', name: 'Dojo Test1' });
      const res = await clubsController.load('d1', 'owner', queryBuilder);
      expect(queryBuilder.eager).to.have.been.calledOnce.and
        .calledWith('owner');
      expect(queryBuilder.findOne).to.have.been.calledOnce.and
        .calledWith({ id: 'd1' });
      expect(res).to.eql({ id: 'd1', name: 'Dojo Test1' });
    });
    it('should throw an error', async () => {
      queryBuilder.findOne.resolves();
      try {
        await clubsController.load('d1', undefined, queryBuilder);
      } catch (e) {
        expect(queryBuilder.findOne).to.have.been.calledOnce.and
          .calledWith({ id: 'd1' });
        expect(e.status).to.equal(404);
      }
    });
  });
});
