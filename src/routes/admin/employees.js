var express = require('express');
var router = express.Router();

var service = new (require('../../biz/employeeService'))();

/* GET home page. */
router.get('/', function(req, res, next) {
    service.getEmpolyees(req, function(err, rows){
        console.log(rows);

        if(rows){
            res.render('admin/employees/index', { title: 'employees', data: rows });
        }else{
            res.render('error', { title: 'Express', error: err});
        }
   });

});

module.exports = router;