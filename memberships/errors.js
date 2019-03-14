class NoUserFound extends Error {
  constructor() {
    super();
    this.message = 'Invalid userId';
    this.status = 404;
  }
}
class MembershipExists extends Error {
  constructor() {
    super();
    this.message = 'Membership already has this role';
    this.status = 400;
  }
}
module.exports = {
  NoUserFound: new NoUserFound(),
  MembershipExists: new MembershipExists(),
};
