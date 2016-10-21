var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/report', function(req, res, next) {
  res.render('report', { title: 'Express' });
});

router.get('/mgmConsole', function(req, res, next) {
  res.render('management/index', { title: 'Express' });
});

router.get('/vendor', function(req, res, next) {
  res.render('management/vendorMgm', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Customer Registration' });
});

module.exports = router;
