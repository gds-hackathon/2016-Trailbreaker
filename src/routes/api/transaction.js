var express = require('express');
var router = express.Router();

var service = new (require('../../biz/transactionService'))();

/* GET home page. */
router.get('/', function(req, res, next) {
    service.getTransaactions(req, function(err, rows){
        console.log(rows);

        if(rows){
            res.render('admin/employees/index', { title: 'employees', data: rows });
        }else{
            res.render('error', { title: 'Express', error: err});
        }
   });

});


router.post('/', function(req, res, next) {

    service.insertTransaction(req, function(err, rows){
        if(err){
            console.log(err);
            res.send({status: 1, message: null})
        }else{
            res.send(rows);
        }
    });

    //res.send(req.body);
});

module.exports = router;
