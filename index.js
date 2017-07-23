const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const { port }       = require('./config/env');
const methodOverride = require('method-override');
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
app.use(routes);

app.listen(port, () => console.log(`Express up and running on port: ${port}`));
