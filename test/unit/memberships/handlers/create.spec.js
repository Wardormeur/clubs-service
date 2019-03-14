const proxy = require('proxyquire').noCallThru();
const sinon = require('sinon');

const membershipsController = {};

describe('memberships/handlers:create', () => {
  let sandbox;
  let next;
  let req;
  let res;
  let handlers;

  before(() => {
    sandbox = sinon.createSandbox();
    membershipsController.create = sandbox.stub();
    handlers = proxy('../../../../memberships/handlers/create', {
      '../controller': membershipsController,
    });
    next = sandbox.stub();
  });
  beforeEach(() => {
    sandbox.reset();
    req = {
      body: {},
    };
    res = {
      send: sandbox.stub(),
    };
  });

  it('should create the membership', async () => {
    req.body = {
      userId: 'u1',
      dojoId: 'd1',
      userType: 'champion',
    };
    membershipsController.create.resolves({ id: 'm1' });
    await handlers[0](req, res, next);
    expect(membershipsController.create).to.have.been.calledOnce.and
      .calledWith('u1', 'd1', 'champion');
    expect(res.send).to.have.been.calledWith({ id: 'm1' });
  });
});
