/**
 * vendorService
 */

var pool = require('../helpers/dbHelper')();


function vendorService(){
    
    this.findAll = function(req, callback){
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
            // if(rows){
            //     for(var key in rows){
            //         rows[key].is_enabled2 = !!rows[key].is_enabled[0];
            //     }
            // }
            callback(err, rows == null? null : rows);
        });
    }

    //find by key
    this.find = function(req, callback){
        this.getAll(req, callback(err, rows == null ? null : rows[0]));
    }
}

module.exports = vendorService;
