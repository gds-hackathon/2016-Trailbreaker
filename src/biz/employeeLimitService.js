/**
 * employeeLimitService
 */

var pool = require('../helpers/dbHelper')();

function employeeLimitService(){
    this.getAllLimitsByEmployeeKey = function(req, callback){
        var cmd = 'select * from employee_limit where employee_key = ?';
        var params = [];

        if(req.params.employee_key){
            cmd = cmd + ' and employee_key = ?';
            params.push(req.params.employee_key);
        }
        
        // console.log(cmd);
        // console.log(params);
        pool.query(cmd, params, function(err, rows){
            // console.log(rows);
            // console.log(err);       
            if(rows){
                //TODO 
                var data = {};
                data.DailyLimit = rows.where(function(item){
                    //TODO filter out some sensitive fields.
                    return item.limit_period_key == 1;
                });
                data.WeeklyLimit = rows.where(function(item){
                    //TODO filter out some sensitive fields.
                    return item.limit_period_key == 2;
                });
                data.MonthlyLimit = rows.where(function(item){
                    //TODO filter out some sensitive fields.
                    return item.limit_period_key == 3;
                });
            }
        });
    };
}


module.exports = employeeLimitService;