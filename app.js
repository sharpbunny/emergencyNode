var express = require('express');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var qt = require('quickthumb');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* -- Instanciate routes -- */
var routes = require('./routes/indexRoute');
var userRoute = require('./routes/userRoute');
//var typeRoute = require('./routes/typeRoute');
//var userRoute = require('./routes/photoRoute');
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
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
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
app.use('/user', userRoute);
app.use('/item', itemRoute);
//app.use('/type', typeRoute);
//app.use('/photo', photoRoute);

// use quickthumb to send image (need imagemagick)
app.use(qt.static(__dirname + '/'));
// upload image using formidable
app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    /* -- Temporary location of our uploaded file -- */
    var temp_path = this.openedFiles[0].path;
    /* -- The file name of the uploaded file -- */
    var file_name = this.openedFiles[0].name;
    /* -- Location where we want to copy the uploaded file -- */
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});

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
