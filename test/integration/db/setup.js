const Knex = require('knex');
const proxy = require('proxyquire');
const setupClubs = require('./setupClubs');
const setupMemberships = require('./setupMemberships');
const setupLeads = require('./setupLeads');

const { knexSnakeCaseMappers, Model } = require('objection');

const createdDbs = [];
const knex = Knex({
  client: 'postgres',
  connection: {
    host: 'db',
    user: 'platform',
    password: 'QdYx3D5y',
    database: 'postgres',
  },
});

before(async () => {
  const name = `clubs_test_${Date.now()}`;
  await knex.raw(`CREATE DATABASE ${name}`);
  const db = Knex({
    client: 'postgres',
    connection: {
      host: 'db',
      user: 'platform',
      password: 'QdYx3D5y',
      database: name,
    },
    ...knexSnakeCaseMappers(),
  });
  //  db.on('query', console.log);
  createdDbs.push({
    db,
    name,
  });
  await setupClubs(db);
  await setupMemberships(db);
  await setupLeads(db);

  global.app = proxy('../../../index', {
    './setup-db': () => {
      Model.knex(db);
    },
  });
});

after(() => {
  const deletePromises = [];
  createdDbs.forEach((db) => {
    deletePromises.push((async () => {
      await db.db.destroy();
      // NOTE: Useful to verify how a test affects the db
      // Comment the deletion of the db as well to do so,
      // and connect via `docker-compose exec db psql -U platform`
      // console.log(db.name);
      await knex.raw(`DROP DATABASE ${db.name}`);
    })());
  });
  return Promise.all(deletePromises);
});
