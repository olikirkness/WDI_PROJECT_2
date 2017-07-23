// const mongoose = require('mongoose');
// const bluebird = require('bluebird');

// const databaseURL = 'mongodb://localhost/wdi-project-2';
// mongoose.connect(databaseURL);
// mongoose.Promise = bluebird;

// const rp = require('request-promise');
const Lists = require('../models/lists');

function listsIndex(req, res) {
  console.log('hello');
  Lists
  .find()
  .exec()
  .then(lists => {
    console.log(lists);
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
  console.log(req.body);
  console.log('hello');
  Lists
    .create(req.body)
    .then(() => {
      res.redirect('/lists');
    });
}

module.exports = {
  index: listsIndex,
  new: listsNew,
  create: listsCreate
};
