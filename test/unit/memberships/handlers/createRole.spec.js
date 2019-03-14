const proxy = require('proxyquire').noCallThru();
const sinon = require('sinon');

const membershipsController = {};

describe('memberships/handlers:createRole', () => {
  let sandbox;
  let next;
  let req;
  let res;
  let handlers;

  before(() => {
    sandbox = sinon.createSandbox();
    membershipsController.update = sandbox.stub();
    handlers = proxy('../../../../memberships/handlers/createRole', {
      '../controller': membershipsController,
    });
    next = sandbox.stub();
  });
  beforeEach(() => {
    sandbox.reset();
    req = {
      body: {},
      params: {},
    };
    res = {
      send: sandbox.stub(),
    };
  });

  it('should add a new role to the membership', async () => {
    req.params = {
      id: 'm1',
    };
    req.body = {
      userType: 'champion',
    };
    membershipsController.update.resolves({ id: 'm1' });
    await handlers[0](req, res, next);
    expect(membershipsController.update).to.have.been.calledOnce.and
      .calledWith('m1', 'champion');
    expect(res.send).to.have.been.calledWith({ id: 'm1' });
  });
  it('should throw an error', async () => {
    req.params = {
      id: 'm1',
    };
    req.body = {
      userType: 'champion',
    };
    const err = new Error('bla');
    membershipsController.update.throws(err);
    await handlers[0](req, res, next);
    expect(membershipsController.update).to.have.been.calledOnce.and
      .calledWith('m1', 'champion');
    expect(res.send).to.not.have.been.called;
    expect(next).to.have.been.calledWith(err);
  });
});
