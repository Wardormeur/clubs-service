const newrelic = require('newrelic'); // eslint-disable-line no-unused-vars
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./util/pino-stream');
const memberships = require('./memberships/routes');
const setupDb = require('./setup-db');

setupDb();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.on('unhandledRejection', err => logger.error(err));
process.on('uncaughtException', logger.error);

app.use('/member', memberships.members);
app.use('/memberships', memberships.memberships);
app.get('/ping', (req, res) => res.send(204));

app.use((err, req, res, next) => {
  logger.error(err);
  if (err.status && err.message) {
    return res.status(err.status).send(err.message);
  }
  return next();
});

app.listen(3000, () => logger.info('clubs-service listening on port 3000'));

module.exports = app;
