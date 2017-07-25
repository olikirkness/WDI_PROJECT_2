const User = require('../models/users');
const List = require('../models/lists');

function usersShow(req, res){
  User
  .findById(req.params.id)
  .exec()
  .then(user => {
    List
    .find({createdBy: user._id})
    .populate('items')
    .exec()
    .then(lists => {
      console.log(user, lists);
      res.render('user/show', {user, lists});
    });
  });
}

module.exports = {
  show: usersShow
};
