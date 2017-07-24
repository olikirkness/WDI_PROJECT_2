const List = require('../models/lists');

function listItemsDelete(req, res){
  List
  .findById(req.params.createdItemIds)
  .exec()
  .then(list => {
    const item = list.items.id(req.params.createdItemIds);
    item.remove();
    list.save();

    res.redirect(`/lists/${list._id}`);
  });
}

module.exports = {
  delete: listItemsDelete
};
