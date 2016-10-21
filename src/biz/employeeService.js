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

    this.updatestatus = function(req, callback){
        //todo authentication.
        var errors = [];
        if(!req.body.employee_key){
            callback(new Error('employee_key is required'), null);
            return;       
        }

        //TODO validation 
        var params = [];
        params.push(!! req.body.is_approved);
        params.push(!! req.body.is_enabled);
        params.push(req.body.employee_key);

        var cmd = 'update employee set is_approved=?, is_enabled = ?, change_date = now(), change_by= user() where employee_key = ?';
        
        pool.query(cmd, params, function(err, rows){
            callback(err, rows);
        });
    };

    this.register = function(req, callback){
        console.log('wechat_id: ' + req.params.wechat_id);
        this.findAll(req, function(err, rows){
            console.log(rows);
            if(rows && rows.length > 0){
                callback(new Error('already registered'), rows[0]);
            }else{
                
                var cmd = 'INSERT INTO `employee` (`first_name`,`last_name`,`phone`,`email_address`,`employee_id`,`employee_token`,`wechat_id`,`is_approved`,`is_enabled`,'
                + '`approved_date`,`create_date`,`change_date`,`change_by`)'
                + 'VALUES(?,?,?,?,?,?,?,0,0,now(),now(),now(),user());';
                console.log(cmd);

                var params = [];

                params.push(req.body.first_name);
                params.push(req.body.last_name);
                params.push(req.body.phone);
                params.push(req.body.email_address);
                params.push(req.body.employee_id);
                params.push(req.body.employee_token);
                params.push(req.params.wechat_id);

                var errors = [];
                if(! req.body.first_name){
                    errors.push('first_name', 'invalid first_name');
                }
                if(! req.body.last_name){
                    errors.push('last_name', 'invalid last_name');
                }
                if(! req.body.phone){
                    errors.push('phone', 'invalid phone');
                }
                if(! req.body.employee_id){
                    errors.push('employee_id', 'invalid employee_id');
                }
                if(! req.params.wechat_id){
                    errors.push('wechat_id', 'wechat_id is required');
                }

                if(errors.length > 0){   
                    var error = new Error('invalid parameters');
                    error.errors = errors;  

                    callback(error, {status:1, message:'invalid parameters'});                    
                }else{

                    //TODO validation

                    pool.query(cmd, params, function(insertErr, data){
                        console.log(data);
                        callback(insertErr, {status:0, message:'success', employee_key: data.insertId, affectedRows: data.affectedRows, });
                    });
                }
            }
        });
    }
}

module.exports = employeeService;
