var express = require('express');
var router = express.Router();

var service = new (require('../../biz/vendorService'))();

/* GET home page. */
router.get('/:vendor_token', function(req, res, next) {
    if(!req.params.vendor_token) throw new Error('invalid parameter');

    service.getAll(req, function(err, rows){
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
    service.getAll(req, function(err, rows){
        console.log('err: ' +err);
        console.log(rows);
        if(rows){
            if(typeof rows)
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
