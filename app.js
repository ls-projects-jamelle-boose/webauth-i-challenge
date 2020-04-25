var express = require('express');
var path = require('path');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dotenv = require('dotenv');
dotenv.config();

var app = express();

// TODO create SESSION logic
const sessionConfig = {
  saveUninitialized: false,
  name: 'saucy maternal',
  secret: 'squid hardware cresting national arrogant',
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  // store: new knexSessionStore({
  //   knex: require('./db/dbConfig'),
  //   tablename: 'sessions',
  //   sidfieldname: 'sid',
  //   createtable: true,
  //   clearInterval: 3600 * 1000,
  // }),
};

// TODO create COOKIE logic

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
