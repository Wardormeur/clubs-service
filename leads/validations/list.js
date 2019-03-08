const { checkSchema } = require('express-validator/check');
const ValidationHelper = require('../../util/ValidationHelper');

module.exports = [
  checkSchema({
    userId: {
      in: ['query'],
      isUUID: true,
    },
    deleted: {
      in: ['query'],
      isInt: true,
      optional: true,
    },
  }),
  ValidationHelper.handleErrors,
];
