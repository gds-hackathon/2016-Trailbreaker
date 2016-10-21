/**
 * employeeService
 */

var pool = require('../helpers/dbHelper')();


function employeeService(){
    
    this.getEmpolyees = function(req, callback){
        pool.query('select * from employee', function(err, rows){
            // console.log(rows);
            // console.log(err);            
            callback(err, rows);
        });
    };

    this.getEmployee = function(req, callback){
        // console.log('employee_id: ' + req.params.employee_id);
        var params = [];
        params.push(req.params.employee_id);
        pool.query('select * from employees where employee_id=?', params, function(err, rows){
            //console.log(rows);
            // console.log(err);
            callback(err, rows == null? null : rows[0]);
        });
    }
}

module.exports = employeeService;
