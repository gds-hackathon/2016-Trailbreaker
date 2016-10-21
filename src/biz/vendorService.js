/**
 * vendorService
 */

var pool = require('../helpers/dbHelper')();


function vendorService(){
    
    this.getAll = function(req, callback){
        console.log('req.params: ' + req.params.vendor_token);
        var params = [];
        var cmd = 'select * from vendor where 1=1 ';

        if(req.params.vendor_key){
            cmd = cmd + ' and vendor_key = ?';
            params.push(req.params.vendor_key);
        }

        if(req.params.vendor_token){
            cmd = cmd + ' and vendor_token = ?';
            params.push(req.params.vendor_token);
        }

            console.log(cmd);
        pool.query(cmd, params, function(err, rows){
            //console.log(rows);
            // console.log(err);
            callback(err, rows == null? null : rows);
        });
    }
}

module.exports = vendorService;
