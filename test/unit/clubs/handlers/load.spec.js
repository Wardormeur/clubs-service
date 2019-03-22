const proxy = require('proxyquire').noCallThru();
const sinon = require('sinon');

const clubsController = {};

describe('clubs/handlers:load', () => {
  let sandbox;
  let next;
  let req;
  let res;
  let handlers;

  before(() => {
    sandbox = sinon.createSandbox();
    clubsController.load = sandbox.stub();
    handlers = proxy('../../../../clubs/handlers/load', {
      '../controller': clubsController,
    });
    next = sandbox.stub();
  });
  beforeEach(() => {
    sandbox.reset();
    req = {
      params: {},
      query: {},
    };
    res = {
      locals: {
        qb: {},
      },
      send: sandbox.stub(),
    };
  });

  it('should call the controller to load the club', async () => {
    req.params = {
      id: 'd1',
    };
    clubsController.load.resolves({ id: 'd1', name: 'Test Dojo1' });
    await handlers[1](req, res, next);
    expect(clubsController.load).to.have.been.calledOnce.and
      .calledWith('d1', undefined);
    expect(next).to.not.have.been.called;
    expect(res.send).to.have.been.calledWith({ id: 'd1', name: 'Test Dojo1' });
  });
  it('should pass down the related query param', async () => {
    req.params = {
      id: 'd1',
    };
    req.query = {
      related: 'owner',
    };
    clubsController.load.resolves({ id: 'd1', name: 'Test Dojo1' });
    await handlers[1](req, res, next);
    expect(clubsController.load).to.have.been.calledOnce.and
      .calledWith('d1', 'owner');
    expect(next).to.not.have.been.called;
    expect(res.send).to.have.been.calledWith({ id: 'd1', name: 'Test Dojo1' });
  });
});
