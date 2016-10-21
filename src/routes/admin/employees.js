var express = require('express');
var router = express.Router();

var service = new (require('../../biz/employeeService'))();

/* GET home page. */
router.get('/', function(req, res, next) {
    service.findAll(req, function(err, rows){
        console.log(err);
        //console.log(rows);

        if(rows){
            res.render('admin/employees/index', { title: 'employees', data: rows });
        }else{
            res.render('error', { title: 'Express', error: {
                status: '1'
            }, message: 'SORRY. DB error.'});
        }
   });

});

module.exports = router;
