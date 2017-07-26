const List = require('../models/lists');

function commentsCreate(req, res) {
  console.log(req.user, 'user -----------------------');
  req.body.commentedBy = req.user;
  console.log(req.body);
  List
  .findById(req.params.id)
  .populate('commentedBy')
  .exec()
  .then(list => {
    list.comments.push(req.body);
    list.save();

    res.redirect(`/lists/${list._id}`);
  });
}

function commentsDelete(req, res){
  List
  .findById(req.params.listId)
  .exec()
  .then(list => {
    const comment = list.comments.id(req.params.commentId);
    comment.remove();
    list.save();

    res.redirect(`/lists/${list._id}`);
  });
}

module.exports = {
  create: commentsCreate,
  delete: commentsDelete
};
