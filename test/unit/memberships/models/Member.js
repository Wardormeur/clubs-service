const proxy = require('proxyquire');

describe('MemberModel', () => {
  const sandbox = sinon.createSandbox();
  let MemberModel;
  let addRole;
  beforeEach(() => {
    sandbox.reset();
    MemberModel = proxy('../../../../memberships/models/Member', {
      objection: {
        Model: class { },
        QueryBuilder: class { },
      },
    });
    addRole = sinon.spy(MemberModel.prototype, 'addRole');
  });
  describe('constructor', () => {
    it('should preset the fields if they all of them are provided', () => {
      const model = new MemberModel('u1', 'd1', 'champion');
      expect(model.id).to.exist;
      expect(model.userId).to.equal('u1');
      expect(model.dojoId).to.equal('d1');
      expect(addRole).to.have.been.calledOnce.and
        .calledWith('champion');
    });
  });
  describe('permissions', () => {
    it('should return the permission model', () => {
      expect(MemberModel.permissions).to.eql({
        champion: [
          { title: 'Dojo Admin', name: 'dojo-admin' },
          { title: 'Ticketing Admin', name: 'ticketing-admin' },
        ],
        mentor: [{ title: 'Ticketing Admin', name: 'ticketing-admin' }],
        'parent-guardian': [],
        'attendee-o13': [],
        'attendee-u13': [],
      });
    });
  });
  describe('hasRole', () => {
    it('should return true if the membership has that role', () => {
      const membership = new MemberModel();
      membership.userTypes = ['mentor'];
      expect(membership.hasRole('mentor')).to.be.true;
    });
    it('should return false if the membership doesnt have the role ', () => {
      const membership = new MemberModel();
      membership.userTypes = [];
      expect(membership.hasRole('mentor')).to.be.false;
    });
    it('should return false if the membership isnt initialized', () => {
      const membership = new MemberModel();
      expect(membership.hasRole('mentor')).to.be.false;
    });
  });
  describe('addRole', () => {
    it('should append the role and the permissions with an init model', () => {
      const membership = new MemberModel();
      membership.userTypes = [];
      membership.userPermissions = [];
      membership.addRole('mentor');
      expect(membership.userTypes).to.eql(['mentor']);
      expect(membership.userPermissions).to.eql([{ title: 'Ticketing Admin', name: 'ticketing-admin' }]);
    });
    it('should append the role and the permissions without being initialized', () => {
      const membership = new MemberModel();
      membership.addRole('mentor');
      expect(membership.userTypes).to.eql(['mentor']);
      expect(membership.userPermissions).to.eql([{ title: 'Ticketing Admin', name: 'ticketing-admin' }]);
    });
    it('should append the role and the permissions without duplicate', () => {
      const membership = new MemberModel();
      membership.addRole('mentor');
      membership.addRole('champion');
      expect(membership.userTypes).to.eql(['mentor', 'champion']);
      expect(membership.userPermissions).to.eql([
        { title: 'Ticketing Admin', name: 'ticketing-admin' },
        { title: 'Dojo Admin', name: 'dojo-admin' },
      ]);
    });
  });
  describe('softDelete', () => {
    it('should define softDelete', () => {
      const qB = new MemberModel.QueryBuilder();
      expect(qB.softDelete).to.be.an('function');
    });
    it('should call patch', async () => {
      const qB = new MemberModel.QueryBuilder();
      qB.patch = sandbox.stub();
      await qB.softDelete();
      expect(qB.patch).to.have.been.calledOnce.and.calledWith({
        deletedAt: sinon.match.date,
        deleted: 1,
      });
    });
  });
});
