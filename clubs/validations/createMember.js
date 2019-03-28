const { checkSchema } = require('express-validator/check');
const ValidationHelper = require('../../util/ValidationHelper');

module.exports = [
  checkSchema({
    id: {
      in: ['params'],
      isUUID: true,
    },
    userId: {
      in: ['body'],
      isUUID: true,
    },
    userType: {
      in: ['body'],
      custom: {
        options: (value) => {
          return ['champion', 'mentor', 'parent-guardian', 'attendee-o13', 'attendee-u13'].indexOf(value) > -1;
        },
      },
    },
  }),
  ValidationHelper.handleErrors,
];
