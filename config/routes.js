const express = require('express');
const router  = express.Router();

const statics = require('../controllers/statics');
const lists = require('../controllers/lists');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

// function secureRoute(req, res, next) {
//   if (!req.session.userId) {
//     return req.session.regenerate(() => {
//       req.flash('danger', 'You must be logged in to view this content');
//       res.redirect('/login');
//     });
//   }
//
//   return next();
// }

router.route('/')
  .get(statics.homepage);

router.route('/lists')
  .get(lists.index)
  .post(lists.create);

router.route('/lists/new')
  .get(lists.new);

router.route('/lists/:id')
  .get(lists.show);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
