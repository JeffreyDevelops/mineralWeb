var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
let db=require('./database');
var indexRouter = require('./routes/home');
var practiceRouter = require('./routes/practice');
var leaderboardsRouter = require('./routes/leaderboards');
var playerRouter = require('./routes/player');
var staffRouter = require('./routes/staff');
;
var app = express();

// view engine setup
app.use('/', indexRouter);
app.use('/practice', practiceRouter);
app.use('/leaderboards', leaderboardsRouter);
app.use('/player', playerRouter);
app.use('/staff', staffRouter);



app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  let sql='SELECT PLAYER FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
      db.query(sql, async function (err, p_data, fields) {
        let resultArray = Object.values(JSON.parse(JSON.stringify(p_data)));
        var ee;
        var pp = [];
        Object.keys(p_data).forEach(async function(key) {
          ee = p_data[key];
          pp.push(ee.PLAYER);
          });
  res.render('error', {userData: p_data, resultArray, pp, ee});
});
});

module.exports = app;