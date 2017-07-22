function listsIndex(req, res) {
  res.render('lists/index');
}

function listsNew(req, res){
  res.render('lists/new');
}

module.exports = {
  index: listsIndex,
  new: listsNew
};
