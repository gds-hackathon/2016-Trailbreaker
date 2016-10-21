var express = require('express');
var router = express.Router();

var service = new (require('../../biz/transactionService'))();

/* GET home page. */
router.get('/', function(req, res, next) {
    service.findAll(req, function(err, rows){
        //console.log(rows);

        if(rows){
            res.send(rows);
        }else{
            res.send(null);
        }
   });
});

router.get('/:transaction_key(\\d+)', function(req, res, next) {
    service.find(req, function(err, row){
        //console.log(row);

        if(row){
            res.send(row);
        }else{
            res.send(null);
        }
   });
});


router.post('/', function(req, res, next) {

    service.insertTransaction(req, function(err, rows){
        if(err){
            console.log(err);
            res.send({status: 1, message: rows})
        }else{
            res.send(rows);
        }
    });

    //res.send(req.body);
});

module.exports = router;
