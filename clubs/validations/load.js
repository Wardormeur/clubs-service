const { checkSchema } = require('express-validator/check');
const ValidationHelper = require('../../util/ValidationHelper');

module.exports = [
  checkSchema({
    id: {
      in: ['params'],
      isUUID: true,
    },
    related: {
      in: ['query'],
      optional: true,
      custom: {
        options: (value) => {
          return ['owner'].indexOf(value) > -1;
        },
      },
    },
  }),
  ValidationHelper.handleErrors,
];
