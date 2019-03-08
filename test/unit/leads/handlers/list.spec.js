const proxy = require('proxyquire').noCallThru();
const sinon = require('sinon');

const leadsController = {};

describe('leads/handlers:list', () => {
  let sandbox;
  let next;
  let req;
  let res;
  let handlers;

  before(() => {
    sandbox = sinon.createSandbox();
    leadsController.list = sandbox.stub();
    handlers = proxy('../../../../leads/handlers/list', {
      '../controller': leadsController,
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
      locals: {
        qb: {
          where: {
            page: 'NULL',
          },
        },
      },
      send: sandbox.stub(),
    };
  });

  it('should call the controller to list the leads', async () => {
    req.query = {
      userId: 'userId1',
    };
    leadsController.list.resolves({ results: [{ id: '1', userId: 'userId1' }] });
    await handlers[1](req, res, next);
    expect(leadsController.list).to.have.been.calledOnce.and.calledWith({ userId: 'userId1' }, {
      where: {
        page: 'NULL',
      },
    });
    expect(next).to.not.have.been.called;
    expect(res.send).to.have.been.calledWith({ results: [{ id: '1', userId: 'userId1' }] });
  });
});
