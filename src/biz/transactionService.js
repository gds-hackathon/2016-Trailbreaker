/**
 * transactionService
 */
//TODO
var pool = require('../helpers/dbHelper')();

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
}

module.exports = transactionService;
