const request = require('supertest');

describe('integration:leads:list', () => {
  let app;

  beforeEach(() => {
    app = global.app;
  });

  it('should return 200', async () => {
    const res = await request(app)
      .get('/leads?userId=009723ce-489b-4fba-8e80-c41d0fb117b7')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.results.length).to.equal(1);
    expect(res.body.total).to.equal(1);
    expect(res.body.results[0].id).to.equal('cf3ff850-6ab9-4387-bf3b-b7f6323f4ace');
    expect(res.body.results[0].email).to.equal('bob@example.com');
    expect(res.body.results[0].userId).to.equal('009723ce-489b-4fba-8e80-c41d0fb117b7');
  });
  it('should return 400 on wrong params', async () => {
    await request(app)
      .get('/leads?userId=123')
      .set('Accept', 'application/json')
      .expect(400);
  });
});

