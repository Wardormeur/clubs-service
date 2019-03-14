const request = require('supertest');

describe('integration:membership:update', () => {
  let app;

  beforeEach(() => {
    app = global.app;
  });

  it('should return the membership with a new userType', async () => {
    const res = await request(app)
      .post('/memberships/463e716d-e2c6-42f6-9809-dc6236f0e480/roles')
      .send({
        userType: 'mentor',
      })
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.id).to.equal('463e716d-e2c6-42f6-9809-dc6236f0e480');
    expect(res.body.userId).to.equal('90a1bf7a-b840-490f-825f-c98a881f2f55');
    expect(res.body.dojoId).to.equal('a3ed8f42-36f6-4ff6-aac2-8d52a788d3c2');
    expect(res.body.userTypes).to.eql(['parent-guardian', 'mentor']);
    expect(res.body.userPermissions).to.eql([{ title: 'Ticketing Admin', name: 'ticketing-admin' }]);
  });
  it('should return 400 when the role already exists', async () => {
    await request(app)
      .post('/memberships/463e716d-e2c6-42f6-9809-dc6236f0e480/roles')
      .send({
        userType: 'mentor',
      })
      .set('Accept', 'application/json')
      .expect(400);
  });
  it('should not have duplicate permissions', async () => {
    const res = await request(app)
      .post('/memberships/463e716d-e2c6-42f6-9809-dc6236f0e480/roles')
      .send({
        userType: 'champion',
      })
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.id).to.equal('463e716d-e2c6-42f6-9809-dc6236f0e480');
    expect(res.body.userId).to.equal('90a1bf7a-b840-490f-825f-c98a881f2f55');
    expect(res.body.dojoId).to.equal('a3ed8f42-36f6-4ff6-aac2-8d52a788d3c2');
    expect(res.body.userTypes).to.eql(['parent-guardian', 'mentor', 'champion']);
    expect(res.body.userPermissions).to.eql([
      { title: 'Ticketing Admin', name: 'ticketing-admin' },
      { title: 'Dojo Admin', name: 'dojo-admin' },
    ]);
  });
});

