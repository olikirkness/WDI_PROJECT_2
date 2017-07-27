const express = require('express');
const router  = express.Router();

const statics = require('../controllers/statics');
const lists = require('../controllers/lists');
const users = require('../controllers/users');
const comments = require('../controllers/comment');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      console.log('hello');
      req.flash('danger', 'You must be logged in to view this content.');
      res.redirect('/login');
    });
  }
  return next();
}

router.route('/')
  .get(statics.homepage);

router.route('/lists')
  .get(lists.index)
  .post(secureRoute, lists.create);

router.route('/lists/new')
  .get(secureRoute, lists.new);

router.route('/lists/:id')
  .get(secureRoute, lists.show)
  .delete(secureRoute, lists.delete)
  .post(secureRoute, lists.update)
  .post(secureRoute, comments.create);


router.route('/lists/:id/edit')
  .get(lists.edit);

router.route('/lists/:listId/comments/:commentId')
  .delete(comments.delete);


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/user/:id')
  .get(secureRoute, users.show);

module.exports = router;
