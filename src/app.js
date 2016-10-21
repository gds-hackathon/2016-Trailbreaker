require('./lib/extensions');
require('./appConfig.js');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var checkSignature = require('./midware/checkSignature');
var wechatHandler = require('./midware/wechatHandler');

var routes = require('./routes/index');

//var users = require('./routes/users');
var employees = require('./routes/admin/employees');
var apiVendor = require('./routes/api/vendor');
var apiEmployee = require('./routes/api/employee');
var apiTransaction = require('./routes/api/transaction');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// Use html as page template
var ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(function(req, res, next){
   if(appConfig.BASE_URL === ''){
       appConfig.BASE_URL = 'http://' + req.hostname;
       if(app.get('port') !=  80){
          appConfig.BASE_URL += ':' + app.get('port');
       }
   } 

   //console.log(appConfig.BASE_URL);
   next();
});
app.use('/pages/', checkSignature);
app.use('/wechat/gd/api', wechatHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/admin/employees', employees);

app.use('/api/vendor', apiVendor);
app.use('/api/employee', apiEmployee);
app.use('/api/transaction', apiTransaction);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
