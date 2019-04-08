const request = require('supertest');

describe('integration:club:createMembership', () => {
  let app;

  beforeEach(() => {
    app = global.app;
  });

  it('should return the membership', async () => {
    const res = await request(app)
      .post('/clubs/7cc86992-de44-4fad-b49f-cc4615b05ab4/members')
      .send({
        userId: '6b6558da-42c3-4deb-a92a-763e9f091fb1',
        userType: 'mentor',
      })
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.id).to.exist;
    expect(res.body.dojoId).to.equal('7cc86992-de44-4fad-b49f-cc4615b05ab4');
    expect(res.body.userId).to.equal('6b6558da-42c3-4deb-a92a-763e9f091fb1');
    expect(res.body.userTypes).to.contain('mentor');
  });
  it('should return 409 on duplicate', async () => {
    await request(app)
      .post('/clubs/7cc86992-de44-4fad-b49f-cc4615b05ab4/members')
      .send({
        userId: '6b6558da-42c3-4deb-a92a-763e9f091fb1',
        userType: 'mentor',
      })
      .set('Accept', 'application/json')
      .expect(400);
  });
  it('should return 404 on non-existing club', async () => {
    await request(app)
      .post('/clubs/2a0cb635-43ba-480b-984e-de9edaf060c2/members')
      .send({
        userId: '6b6558da-42c3-4deb-a92a-763e9f091fb1',
        userType: 'mentor',
      })
      .set('Accept', 'application/json')
      .expect(404);
  });
});

