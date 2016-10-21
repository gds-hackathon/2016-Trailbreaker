var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/report', function(req, res, next) {
  res.render('report', { title: 'Express' });
});
<<<<<<< HEAD
router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Customer Registration' });
});
router.get('/transaction', function(req, res, next) {
  res.render('transaction', { title: 'Transaction' });
});
=======

router.get('/mgmConsole', function(req, res, next) {
  res.render('management/index', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Customer Registration' });
});

>>>>>>> ad973ae05764ecb64adeffd6c14f42d5e6291376
module.exports = router;
