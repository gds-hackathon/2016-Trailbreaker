/**
 * dbHelper
 */

var mysql = require('mysql');


var appDbPool = mysql.createPool({
    connectionLimit : 100,
    host: appConfig.app_db.host,
    port: appConfig.app_db.port,
    user: appConfig.app_db.user,
    password: appConfig.app_db.password,
    database: appConfig.app_db.database,
    waitForConnections: true
});

function getAppDbPool(){
    return appDbPool;
}


module.exports = getAppDbPool;