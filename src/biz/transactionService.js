/**
 * transactionService
 */
//TODO
var pool = require('../helpers/dbHelper')();
var VenderService = require('./vendorService');

var transactions = [   
];


function transactionService(){
    
    this.getTransactions = function(req, callback){
        pool.query('select * from transactions', function(err, rows){
            // console.log(rows);
            // console.log(err);            
            callback(err, rows);
        });
    };

    this.getTransaction = function(req, callback){
        // console.log('transaction_id: ' + req.params.transaction_id);
        // console.log('vendor_id: ' + req.params.vendor_id);
        var params = [];
        params.push(req.params.employee_id);
        pool.query('select * from transactions where vendor_id = ? and transaction_id=?', params, function(err, rows){
            //console.log(rows);
            // console.log(err);
            callback(err, rows == null? null : rows[0]);
        });
    }

    this.insertTransaction = function(req, callback){

        var errors = [];
        if(! req.body.employee_key){
            errors.push('employee_key', 'invalid employee_key');
        }
        if(! req.body.vendor_key){
            errors.push('vendor_key', 'invalid vendor_key');
        }
        if(! req.body.request_amount){
            errors.push('request_amount', 'invalid request_amount');
        }
        
        vender = new VenderService();
        vender.find({'params':{'vendor_key':req.body.vendor_key}}, function(err,row){
            var discount = row.discount || 0;
            //console.log('get :' + discount);
            var paid_amount = req.body.request_amount * (1 - discount);

            console.log('paid_amount' + paid_amount);
            var cmd = 'INSERT INTO `transaction`' +
                '(`employee_key`,' +
                '`attendances`,' +
                '`vendor_key`,' +
                '`discount`,' +
                '`transaction_date`,' +
                '`request_amount`,' +
                '`paid_amount`,' +
                '`transaction_status_key`,' +
                '`transaction_status_resone_key`,' +
                '`create_date`,' +
                '`change_date`,' +
                '`change_by`) ' +
                'VALUES' +
                '(?,?,?,?,now(),?,?,?,?,now(),now(),user())' +
                ';';
            
            //console.log(cmd);

            var params = [];

            params.push(req.body.employee_key);
            params.push(req.body.attendances);
            params.push(req.body.vendor_key);
            params.push(discount);
            params.push(req.body.request_amount);
            params.push(paid_amount);
            params.push(1);
            params.push(1);

            console.log(params);

            if(errors.length > 0){   
                var error = new Error('invalid parameters');
                error.errors = errors;  

                callback(error, {status:0, message:'invalid parameters'});                    
            }else{

                //TODO validate employee/vendor/coupon status && check limit

                pool.query(cmd, params, function(insertErr, data){
                    //console.log(data);
                    callback(insertErr, {status:0, message:'success', transaction_key: data.insertId, affectedRows: data.affectedRows});
                });
            }
        })
    }
}

module.exports = transactionService;
