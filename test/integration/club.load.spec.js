const request = require('supertest');

describe('integration:club:load', () => {
  let app;

  beforeEach(() => {
    app = global.app;
  });

  it('should return 200', async () => {
    const res = await request(app)
      .get('/clubs/7cc86992-de44-4fad-b49f-cc4615b05ab4')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.id).to.equal('7cc86992-de44-4fad-b49f-cc4615b05ab4');
  });

  it('should allow to specify the fields', async () => {
    const res = await request(app)
      .get('/clubs/7cc86992-de44-4fad-b49f-cc4615b05ab4?fields=id,name')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body).to.have.keys(['id', 'name']);
  });

  it('should retrieve the owner as well', async () => {
    const res = await request(app)
      .get('/clubs/7cc86992-de44-4fad-b49f-cc4615b05ab4?related=owner')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body.owner).to.exist;
    expect(res.body.owner.id).to.equal('c6d23fee-494b-4b3c-867f-73a5aa6cafe9');
  });


  it('should return 404 when ', async () => {
    await request(app)
      .get('/clubs/7cc86992-de44-4fad-b49f-cc4615b01234')
      .set('Accept', 'application/json')
      .expect(404);
  });
});

