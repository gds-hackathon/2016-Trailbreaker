var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/report', function(req, res, next) {
  res.render('report', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Customer Registration' });
});
router.get('/transaction', function(req, res, next) {
  res.render('transaction', { title: 'Transaction' });
});

//admin start
router.get('/admin', function(req, res, next) {
  res.render('management/index', { title: 'Express' });
});

router.get('/admin/vendor', function(req, res, next) {
  res.render('management/vendorMgm', { title: 'Express' });
});

router.get('/admin/approveEmployee', function(req, res, next) {
  res.render('management/approveEmployee', { title: 'Approve Employee' });
});
//admin end

//chart start
router.get('/charts/employeeChart', function(req, res, next) {
  res.render('management/charts/employeeChart', { title: 'Express' });
});
//chart end

module.exports = router;
