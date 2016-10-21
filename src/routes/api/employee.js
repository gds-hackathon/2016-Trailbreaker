var express = require('express');
var router = express.Router();

var service = new (require('../../biz/employeeService'))();

router.get('/wechat_id/:wechat_id', function(req, res, next) {
    // console.log(1119);
    if(!req.params.wechat_id) throw new Error('invalid parameter');

    service.find(req, function(err, row){
        // console.log(err);
        // console.log(row);

        if(row){
            var data = row;
            res.send(data);
        }
        else res.send(null);
   });
});

router.get('/:employee_key(\\d+)', function(req, res, next) {
    // console.log(1119);
    if(!req.params.employee_key) throw new Error('invalid parameter');

    service.find(req, function(err, row){
        // console.log(err);
        // console.log(row);

        if(row){
            var data = row;
            res.send(data);
        }
        else res.send(null);
   });
});

router.get('/:employee_token([a-zA-Z0-9-]+)', function(req, res, next) {
    // console.log(1139);
    if(!req.params.employee_token) throw new Error('invalid parameter');

    service.findAll(req, function(err, rows){
        // console.log(err);
        //console.log(rows);

        if(rows){
            var data = rows.select(function(item, index){
                //TODO filter out some sensitive fields.
                return item;
            })[0];
            res.send(data);
        }
        else res.send(null);
   });
});

router.get('/', function(req, res, next) {
    // console.log(13119);
    service.findAll(req, function(err, rows){
        // console.log('err: ' +err);
        // console.log(rows);
        if(rows){
            //TODO 
            var data = rows.select(function(item, index){
                //TODO filter out some sensitive fields.
                return item;
            });

            res.send(data);
        }else{
            res.send([]);
        }
   });
});

module.exports = router;
