var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var logger = require('./utils/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* -- Json Web Token -- */
var jwt = require('jsonwebtoken');
var verifytoken = require('./models/verifytoken');
/* -- Instanciate routes -- */
var routes = require('./routes/indexRoute');
var userRoute = require('./routes/userRoute');
var typeRoute = require('./routes/typeRoute');
//var photoRoute = require('./routes/photoRoute');
var itemRoute = require('./routes/itemRoute');
/* -- instanciate connector to mySQL -- */
var connection = require('./connection');

var app = express();

/* -- connect to mysql -- */
connection.init();

/* -- start app conf -- */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
logger.debug("Overriding 'Express' logger");
app.use(require('morgan')("combined", { "stream": logger.stream }));
app.use(bodyParser.json({limit: '50mb'})); //can get long request...
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Define CORS to allow cross origin access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

/* -- associate URL to ROUTES -- */
app.use('/', routes);
// we can't protect this route with token until we create a separate route to authenticate user
app.use('/user', userRoute);
// access to item is protected by token
//app.use('/item', verifytoken, itemRoute);
app.use('/item', itemRoute);
app.use('/type', typeRoute);
//app.use('/photo', photoRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') 
{
  app.use(function(err, req, res, next) 
  {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) 
{
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
