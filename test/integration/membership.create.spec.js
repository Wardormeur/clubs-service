const request = require('supertest');

describe('integration:membership:create', () => {
  let app;

  beforeEach(() => {
    app = global.app;
  });

  it('should return the membership', async () => {
    const res = await request(app)
      .post('/memberships')
      .send({
        dojoId: '6b18e446-60c7-4f17-bc29-22222fe9b0d6',
        userId: 'bda32e08-60d3-432d-933c-dab80a97b867',
        userType: 'mentor',
      })
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.id).to.exist;
    expect(res.body.dojoId).to.equal('6b18e446-60c7-4f17-bc29-22222fe9b0d6');
    expect(res.body.userId).to.equal('bda32e08-60d3-432d-933c-dab80a97b867');
    expect(res.body.userTypes).to.contain('mentor');
  });
});

