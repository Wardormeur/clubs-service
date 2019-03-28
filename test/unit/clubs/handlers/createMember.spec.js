const proxy = require('proxyquire').noCallThru();
const sinon = require('sinon');

const membershipsController = {};
const clubsController = {};

describe('clubs/handlers:createMember', () => {
  let sandbox;
  let next;
  let req;
  let res;
  let handlers;

  before(() => {
    sandbox = sinon.createSandbox();
    membershipsController.create = sandbox.stub();
    clubsController.load = sandbox.stub();
    handlers = proxy('../../../../clubs/handlers/createMember', {
      '../../memberships/controller': membershipsController,
      '../controller': clubsController,
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
  it('should verify the dojo exists', async () => {
    req.body = {
      userId: 'u1',
      userType: 'champion',
    };
    req.params = {
      id: 'd1',
    };
    clubsController.load.resolves({ id: 'd1' });
    await handlers[0](req, res, next);
    expect(clubsController.load).to.have.been.calledOnce.and
      .calledWith('d1');
    expect(next).to.have.been.calledWith();
  });
  it('should throw if the club doesnt exists', async () => {
    const err = new Error();
    req.body = {
      userId: 'u1',
      userType: 'champion',
    };
    req.params = {
      id: 'd1',
    };
    clubsController.load.throws(err);
    await handlers[0](req, res, next);
    expect(clubsController.load).to.have.been.calledOnce.and
      .calledWith('d1');
    expect(next).to.have.been.calledWith(err);
  });

  it('should create the membership', async () => {
    req.body = {
      userId: 'u1',
      userType: 'champion',
    };
    req.params = {
      id: 'd1',
    };
    membershipsController.create.resolves({ id: 'm1' });
    await handlers[1](req, res, next);
    expect(membershipsController.create).to.have.been.calledOnce.and
      .calledWith('u1', 'd1', 'champion');
    expect(res.send).to.have.been.calledWith({ id: 'm1' });
  });
});
