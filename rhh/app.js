var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var seedRouter = require('./routes/seed');
var usersRouter = require('./routes/users');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
var app = express();
require('./database');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//middlewares
require('./config/passport');
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
    cookie : {
    
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(seedRouter);
app.use(require('./routes/categorySeed'));
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
  res.render('error');
});

module.exports = app;
