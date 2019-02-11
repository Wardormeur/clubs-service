const request = require('supertest');

describe('integration:member:delete', () => {
  let app;

  beforeEach(() => {
    app = global.app;
  });

  it('should return 204 on soft-delete', async () => {
    await request(app)
      .delete('/members/535b4145-4f83-4953-b755-b38cc7d69294')
      .send({ soft: true })
      .set('Accept', 'application/json')
      .expect(204);
  });
  it('should return 204 on hard delete', async () => {
    await request(app)
      .delete('/members/90d17d7a-0333-42c7-95ee-0e9db52f9d96')
      .set('Accept', 'application/json')
      .expect(204);
  });
  it('should return 404 if the id doesn\'t exists', async () => {
    const res = await request(app)
      .delete('/members/a5d60790-17c4-4a86-a023-d1558b666666')
      .set('Accept', 'application/json')
      .expect(404);
  });
});

