const { checkSchema } = require('express-validator/check');
const ValidationHelper = require('../../util/ValidationHelper');

module.exports = [
  checkSchema({
    userId: {
      in: ['query'],
      isUUID: true,
    },
  }),
  ValidationHelper.handleErrors,
];
