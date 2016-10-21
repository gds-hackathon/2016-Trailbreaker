/**
 * employeeLimitService
 */

var pool = require('../helpers/dbHelper')();

function employeeLimitService(){
    this.getAllLimitsByEmployeeKey = function(employee_key, callback){
        var cmd = 'select * from employee_limit where employee_key = ?';
        var params = [];

        params.push(employee_key);
        
        // console.log(cmd);
        // console.log(params);
        pool.query(cmd, params, function(err, rows){
            //console.log('employee limit rows' );       
            //console.log(rows);
            if(rows){
                //TODO 
                var data = {};
                data.DailyLimit = rows.where(function(item){
                    //TODO filter out some sensitive fields.
                    return item.limit_period_key == 1;
                })[0].max_amount;
                data.WeeklyLimit = rows.where(function(item){
                    //TODO filter out some sensitive fields.
                    return item.limit_period_key == 2;
                })[0].max_amount;
                data.MonthlyLimit = rows.where(function(item){
                    //TODO filter out some sensitive fields.
                    return item.limit_period_key == 3;
                })[0].max_amount;
                //console.log('employee limit data');
                //console.log(data);
                callback(null, data);
            }
            else
            {
                callback(new Error('no employee limit enabled'), null);
            }
        });
    };
}


module.exports = employeeLimitService;