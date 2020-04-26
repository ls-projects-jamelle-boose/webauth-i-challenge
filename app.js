const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const restricted = require('./middlewares/restricted');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

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
  store: new knexSessionStore({
    knex: require('./db/dbConfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 3600 * 1000,
  }),
};

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', restricted, usersRouter);
app.use('/auth', authRouter);

module.exports = app;
