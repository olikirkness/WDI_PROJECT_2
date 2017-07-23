const express = require('express');
const router  = express.Router();

const statics = require('../controllers/statics');
const lists = require('../controllers/lists');

router.route('/')
  .get(statics.homepage);

router.route('/lists')
  .get(lists.index)
  .post(lists.create);

router.route('/lists/new')
  .get(lists.new);

module.exports = router;
