// const mongoose = require('mongoose');
// const bluebird = require('bluebird');

// const databaseURL = 'mongodb://localhost/wdi-project-2';
// mongoose.connect(databaseURL);
// mongoose.Promise = bluebird;

// const rp = require('request-promise');
const Lists = require('../models/lists');
const Items = require('../models/listItems');

function listsIndex(req, res) {

  Lists
  .find()
  .populate('items')
  .exec()
  .then(lists => {
    console.log(`line 20 ${lists}`);
    res.render('lists/index', { lists });
  })
  .catch(err => {
    res.status(500).render('error', { error: err });
  });
}

function listsNew(req, res){
  res.render('lists/new');
}

function listsCreate(req, res){
  const items = req.body.items;
  const list = req.body;
  delete list.items;
  Items
  .create(items)
  .then(createdItems => {
    const createdItemIds = createdItems.map((item) => item._id);
    list.items = createdItemIds;
    return Lists
    .create(list)
    .then(() => {
      res.redirect('/lists');
    });
  })
  .catch(err => {
    res.status(500).render('error', { error: err });
  });

}

function listsEdit(req, res, next) {
  Lists
    .findById(req.params.id)
    .populate('items')
    .then((list) => {
      if(!list) return res.status(404).render('statics/404');
      res.render('lists/edit', { list });
    })
    .catch(next);
}

function listsShow(req, res, next){
  Lists
  .findById(req.params.id)
  .populate('items')
  .exec()
  .then((list) => {
    console.log(list);
    if(!list) return res.status(404).render('statics/404');
    res.render('lists/show', { list });
  })
  .catch(next);
}

function listsDelete(req, res, next) {
  Lists
    .findById(req.params.id)
    .then((list) => {
      if(!list) return res.status(404).render('statics/404');
      return list.remove();
    })
    .then(() => res.redirect('/lists'))
    .catch(next);
}

function listsUpdate(req, res, next) {
  console.log(req.body);
  Lists
    .findById(req.params.id)
    .then((list) => {
      if(!list) return res.status(404).render('statics/404');

      for(const field in req.body) {
        list[field] = req.body[field];
      }

      return list.save();
    })
    .then((list) => res.redirect(`/lists/${list.id}`))
    .catch(next);
}


module.exports = {
  index: listsIndex,
  new: listsNew,
  create: listsCreate,
  show: listsShow,
  delete: listsDelete,
  edit: listsEdit,
  update: listsUpdate
};
