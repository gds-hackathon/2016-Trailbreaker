/**
 * employeeService
 */

var pool = require('../helpers/dbHelper')();


function employeeService(){
    
    this.findAll = function(req, callback){

        var cmd = 'select * from employee where 1 = 1 ';
        var params = [];

        if(req.params.employee_key){
            cmd = cmd + ' and employee_key = ?';
            params.push(req.params.employee_key);
        }
        if(req.params.employee_token){
            cmd = cmd + ' and employee_token = ?';
            params.push(req.params.employee_token);
        }
        if(req.params.wechat_id){
            cmd = cmd + ' and wechat_id = ?';
            params.push(req.params.wechat_id);
        }
        // console.log(cmd);
        // console.log(params);
        pool.query(cmd, params, function(err, rows){
            // console.log(rows);
            // console.log(err);            
            callback(err, rows);
        });
    };

    //find by key
    this.find = function(req, callback){
        // console.log('employee_key: ' + req.params.employee_key);
        this.findAll(req, function(err, rows){
            callback(err, rows == null ? null : rows[0]);
        });
    }
}

module.exports = employeeService;
