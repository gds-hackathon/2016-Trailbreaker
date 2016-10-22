/**
 * transactionService
 */
//TODO
var pool = require('../helpers/dbHelper')();
var VenderService = require('./vendorService');
var EmployeeService = require('./employeeService');
var EmployeeLimitService = require('./employeeLimitService')

var __sqlstr = 'select t.*,e.wechat_id, e.first_name, e.last_name, ts.transaction_status, tsr.content from `transaction` t'
        + ' INNER JOIN `employee` e on e.employee_key = t.employee_key ' 
        + ' INNER JOIN transaction_status ts on t.transaction_status_key = ts.transaction_status_key '
        + ' LEFT JOIN transaction_status_resone tsr on t.transaction_status_resone_key = tsr.transaction_status_resone_key '
        + ' where 1=1';


function transactionService(){
    
    this.findAll = function(req, callback){
        var cmd = __sqlstr;
        var params = [];
        if(req.params.transaction_key) {
            cmd += ' and t.transaction_key = ?';
            params.push(req.params.transaction_key);
        }

        if(req.params.wechat_id) {
            cmd += ' and e.wechat_id = ?';
            params.push(req.params.wechat_id);
        }
        //console.log(cmd);
        pool.query(cmd, params, function(err, rows){
            // console.log(rows);
            // console.log(err);            
            callback(err, rows);
        });
    };

    this.find = function(req, callback){
        console.log('transaction_key: ' + req.params.transaction_key);
        // console.log('vendor_id: ' + req.params.vendor_id);
        this.findAll(req, function(err, rows){
            callback(err, (rows == null || rows.length == 0)? null : rows[0])
        });
    }
    
    var topThis = this;

    this.insertTransaction = function(req, callback){

        var errors = [];

        if(! req.body.vendor_key){
            errors.push('vendor_key', 'invalid vendor_key');
        }
        if(! req.body.request_amount){
            errors.push('request_amount', 'invalid request_amount');
        }

        var getEplParams = {"params":{"wechat_id": req.params.wechat_id}};
        
        var svcObj = new EmployeeService();
        svcObj.findAll(getEplParams, function(err, rows){
            if(rows == null || rows.length ==0){
                callback({status: 2, message : 'not register yet', errors: []}, null);
            }else{
                req.body.employee_key = rows[0].employee_key;
                
                vender = new VenderService();
                vender.find({'params':{'vendor_key':req.body.vendor_key}}, function(err,row){
                    var discount = row.discount || 0;
                    //console.log('get :' + discount);
                    var paid_amount = req.body.request_amount * (1 - discount);

                    //console.log('paid_amount' + paid_amount);
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

                        callback(error, {status:1, message:'invalid parameters'});                    
                    }
                    else if(!row.is_enabled)
                    {
                        var error = new Error('invalid status');
                        error.errors = errors;  

                        callback(error, {status:1, message:'vender is disabled'});  
                    }
                    else{

                        //TODO validate employee/vendor/coupon status && check limit
                        var employee  = new EmployeeService();

                        employee.find({'params':{'employee_key':req.body.employee_key}}, function(err,row){
                            //console.log('is_enabled' + row.is_enabled)
                            if(row.is_enabled != 1 )
                            {
                                var error = new Error('invalid status');
                                error.errors = errors;  

                                callback(error, {status:1, message:'employee is disabled'});  
                            }
                            else{
                                var employeeLimit = new EmployeeLimitService();
                                employeeLimit.getAllLimitsByEmployeeKey(req.body.employee_key, function(err, data){
                                    //console.log('employee limit' + data);
                                    if(data)
                                    {
                                        topThis.getTotalAmountByEmpolyeeKey(req.body.employee_key, function(err, rows){
                                            var totalAmount = {};
                                            //console.log('total amount' + rows);
                                            totalAmount.Daily = rows.where(function(item){
                                                //TODO filter out some sensitive fields.
                                                return item.limit_period_key == 1;
                                            })[0].total_amount;
                                            totalAmount.Weekly = rows.where(function(item){
                                                //TODO filter out some sensitive fields.
                                                return item.limit_period_key == 2;
                                            })[0].total_amount;
                                            totalAmount.Monthly = rows.where(function(item){
                                                //TODO filter out some sensitive fields.
                                                return item.limit_period_key == 3;
                                            })[0].total_amount;

        console.log(data);
                                            console.log('data.DailyLimit' + data.DailyLimit);
                                            console.log('totalAmount.Daily' + totalAmount.Daily);

                                            if(data.DailyLimit <  totalAmount.Daily)
                                            {
                                                var error = new Error('invalid status');
                                                callback(error, {status:1, message:'execed daily limit'});
                                            }else if(data.WeeklyLimit <  totalAmount.Weekly)
                                            {
                                                var error = new Error('invalid status');
                                                callback(error, {status:1, message:'execed weekly limit'});
                                            }else if(data.MonthlyLimit <  totalAmount.Monthly)
                                            {
                                                var error = new Error('invalid status');
                                                callback(error, {status:1, message:'execed monthly limit'});
                                            }
                                            else
                                            {
                                                pool.query(cmd, params, function(insertErr, data){
                                                    console.log(data);
                                                    callback(insertErr, {status:0, message:'success', transaction_key: data.insertId, affectedRows: data.affectedRows});
                                                });
                                            }
                                        });
                                    
                                    }else
                                    {
                                        pool.query(cmd, params, function(insertErr, data){
                                            console.log(data);
                                            callback(insertErr, {status:0, message:'success', transaction_key: data.insertId, affectedRows: data.affectedRows});
                                        });
                                    }

                                });
                            }
                        });
                    }
                })
            }
        });       

    };

    this.getTotalAmountByEmpolyeeKey = function(employeeKey, callback){
        var cmd = 
        'select 1 as limit_period_key, sum(temp.discount_amount) as total_amount from (select (request_amount - paid_amount) as `discount_amount` ' +
        ',DATEDIFF(now(),transaction_date) as `days`  from `transaction` where transaction_status_key = 1 and employee_key = ?) as temp ' +
        'where temp.days <= 1 ' +
        'union all ' +
        'select 2 as limit_period_key, sum(temp.discount_amount) as total_amount from (select (request_amount - paid_amount) as `discount_amount` ' +
        ',DATEDIFF(now(),transaction_date) as `days`  from `transaction` where transaction_status_key = 1 and employee_key = ?) as temp ' +
        'where temp.days <= 7 ' +
        'union all ' +
        'select 3 as limit_period_key, sum(temp.discount_amount) as total_amount from (select (request_amount - paid_amount) as `discount_amount` ' +
        ',DATEDIFF(now(),transaction_date) as `days`  from `transaction` where transaction_status_key = 1 and employee_key = ?) as temp ' +
        'where temp.days <= 31; ';

        var params = [];

        params.push(employeeKey);
        params.push(employeeKey);
        params.push(employeeKey);

        //console.log(params);

        pool.query(cmd, params, function(err, rows){
            //console.log('sdfasdf' + rows);
            // console.log(err);       
            if(rows == null || !rows || rows.length == 0)
            {
                var error = new Error('no data found');
                //{status:1,message:'no transaction found for the employee' + employeeKey}
                callback(err, null);
            }     
            else{
                callback(err, rows);
            }
        });
        
    };
    
}

module.exports = transactionService;
