var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/report', function(req, res, next) {
  res.render('report', { title: 'Express' });
});

router.get('/pages/registration', function(req, res, next) {
  res.render('registration', { title: 'Customer Registration' });
});
router.get('/pages/transaction', function(req, res, next) {
  res.render('transaction', { title: 'Transaction' });
});

router.get('/admin', function(req, res, next) {
  res.render('management/index', { title: 'Express' });
});

router.get('/admin/vendor', function(req, res, next) {
  res.render('management/vendorMgm', { title: 'Express' });
});

router.get('/admin/approveEmployee', function(req, res, next) {
  res.render('management/approveEmployee', { title: 'Approve Employee' });
});

module.exports = router;
