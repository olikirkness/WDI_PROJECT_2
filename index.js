const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const { port, secret }        = require('./config/env');
const methodOverride = require('method-override');
const session   = require('express-session');
const User                    = require('./models/users');

mongoose.Promise     = require('bluebird');
const routes         = require('./config/routes');
const app            = express();

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURL);
mongoose.Promise = require('bluebird');


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
  // if no id inside req.session, carry on with next peice of middleware.
  if (!req.session.userId) return next();

  // if id, find User with that id and make accessable inside views.
  User
    .findById(req.session.userId)
    .exec()
    .then(user => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in to view this content');
          res.redirect('/');
        });
      }

      req.session.userId = user._id;

      //I want to make the current users information accessable in any route.
      req.user = user;

      // adding properties into the locals object meaning i can access these inside ANY view.
      res.locals.user = user;
      res.locals.isLoggedIn = true;

      next();
    });
});

app.use(routes);

app.listen(port, () => console.log(`Express up and running on port: ${port}`));
