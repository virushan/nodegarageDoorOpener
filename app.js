var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes        = require('./routes/index');
var api           = require('./routes/api');
var todo          = require('./routes/todo');
var gpio          = require('./routes/gpio');
var notification  = require('./routes/config');
var doors         = require('./routes/doors');
var door          = require('./routes/door');
var testApi       = require('./routes/test');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', [api, todo]);
app.use('/api/config', [gpio, notification]);
app.use('/api/doors', doors);
app.use('/api/door', door);
app.use('/api/test', testApi);


// catch 404 and forward to error handler
app.use(function(req, res) {
  res.json(404, {error: {status: 404, message: 'Page not found'}});
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
