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
router.get('/transaction', function(req, res, next) {
  res.render('transaction', { title: 'Transaction' });
});
>>>>>>> bce1de9383dd5a08244edec1565cb6b72712674b

router.get('/mgmConsole', function(req, res, next) {
  res.render('management/index', { title: 'Express' });
});

router.get('/approveEmployee', function(req, res, next) {
  res.render('management/approveEmployee', { title: 'Approve Employee' });
});
<<<<<<< HEAD
=======


>>>>>>> bce1de9383dd5a08244edec1565cb6b72712674b
module.exports = router;
