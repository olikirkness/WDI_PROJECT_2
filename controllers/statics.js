const User = require('../models/users');

function staticsIndex(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('statics/index', { users }));
}

module.exports = {
  homepage: staticsIndex
};
