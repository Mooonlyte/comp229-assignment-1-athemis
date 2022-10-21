// COMP229 Assignment 2 | config/app.js | Andreas Themistocles | 301251197 | October 20th, 2022
// install packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// install authentication modules
let session = require('express-session')
let passport = require('passport')
let passportLocal = require('passport-local')
let localStrategy = passportLocal.Strategy
let flash = require('connect-flash')


// database setup
let mongoose = require('mongoose')
let DB = require('./db')

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongodb = mongoose.connection
mongodb.on('error', console.error.bind(console, 'Connection Error'))
mongodb.once('open', function(){
  console.log('Connected to MongoDB')
})

// adding routes
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contacts')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// express session setup
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}))

// flash initialization
app.use(flash())

// passport initialization
app.use(passport.initialize())
app.use(passport.session())

// passport user configuration

// create user model instance
let userModel = require('../models/user')
let User = userModel.User

// user authentication strategy
passport.use(User.createStrategy())

// serialize and deserialize user information
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error' , {title: 'Error'});
});

module.exports = app;
