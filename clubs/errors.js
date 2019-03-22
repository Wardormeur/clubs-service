class ClubNotFound extends Error {
  constructor() {
    super();
    this.status = 404;
    this.message = 'Invalid clubId';
  }
}

module.exports = {
  ClubNotFound: new ClubNotFound(),
};
