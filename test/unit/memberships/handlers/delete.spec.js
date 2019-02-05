const proxy = require('proxyquire').noCallThru();
const sinon = require('sinon');

const membershipsController = {};

describe('memberships/handlers:delete', () => {
  let sandbox;
  let next;
  let req;
  let res;
  let handlers;

  before(() => {
    sandbox = sinon.createSandbox();
    membershipsController.delete = sandbox.stub();
    membershipsController.softDelete = sandbox.stub();
    membershipsController.exists = sandbox.stub();
    handlers = proxy('../../../../memberships/handlers/delete', {
      '../controller': membershipsController,
    });
    next = sandbox.stub();
  });
  beforeEach(() => {
    sandbox.reset();
    req = {
      params: {},
      body: {},
    };
    res = {
      locals: {},
      status: sandbox.stub().returns(res),
      send: sandbox.stub(),
      sendStatus: sandbox.stub(),
    };
  });

  it('should return 404 when the user doesnt have any membership', async () => {
    req.params = {
      id: 'userId1',
    };
    req.body = {};
    membershipsController.delete.resolves(undefined);
    await handlers[0](req, res, next);
    expect(res.sendStatus).to.have.been.calledWith(404);
  });

  it('should soft-delete the user', async () => {
    req.params = {
      id: 'userId1',
    };
    req.body = {
      soft: true,
    };
    membershipsController.softDelete.resolves({ userId: 'userId1' });
    await handlers[0](req, res, next);
    expect(membershipsController.softDelete).to.have.been.calledOnce;
    expect(membershipsController.softDelete).to.have.been.calledWith({ userId: 'userId1' });
    expect(next).to.not.have.been.called;
    expect(res.sendStatus).to.have.been.calledWith(204);
  });
  it('should hard-delete the user', async () => {
    req.params = {
      id: 'userId1',
    };
    req.body = {};
    membershipsController.delete.resolves({ userId: 'userId1' });
    await handlers[0](req, res, next);
    expect(membershipsController.delete).to.have.been.calledOnce;
    expect(membershipsController.delete).to.have.been.calledWith({ userId: 'userId1' });
    expect(next).to.not.have.been.called;
    expect(res.sendStatus).to.have.been.calledWith(204);
  });
});
