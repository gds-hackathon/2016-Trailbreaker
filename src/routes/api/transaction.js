var express = require('express');
var router = express.Router();

var service = new (require('../../biz/transactionService'))();

/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO security
    
    service.findAll(req, function(err, rows){
        //console.log(rows);
        if(rows){
            res.send(rows);
        }else{
            res.send(null);
        }
   });
});

router.get('/wechat_id/:wechat_id/:transaction_key(\\d+)', function(req, res, next) {
    //TODO security
    service.findAll(req, function(err, row){
        //console.log(row);

        if(row){
            res.send(row);
        }else{
            res.send(null);
        }
   });
});

router.get('/wechat_id/:wechat_id', function(req, res, next) {
    //TODO security
    service.findAll(req, function(err, row){
        //console.log(row);

        if(row){
            res.send(row);
        }else{
            res.send(null);
        }
   });
});

router.get('/:transaction_key(\\d+)', function(req, res, next) {
    //TODO security
    service.find(req, function(err, row){
        //console.log(row);

        if(row){
            res.send(row);
        }else{
            res.send(null);
        }
   });
});



router.post('/wechat_id/:wechat_id', function(req, res, next) {
    //TODO security, we should require nonce and signature be passed in
    service.insertTransaction(req, function(err, rows){
        if(err){
            console.log(err);
            res.send({status: err.status, message: err.message, errors: err.errors})
        }else{
            res.send(rows);
        }
    });

    //res.send(req.body);
});


router.get('/qrcode/wechat_id/:wechat_id/:transaction_key', function(req, res, next) {
    console.log(req.url);
    createQrCode1(req.query.data, res, createQrCode2);
});

function createQrCode1(urlData, res, callback){
    var http = require('http');

    var data = '{"data":{"kind":"Url","correctionLevel":"M","quietZone":"Zero","optimizeCl":true,"content":"'
    + 'http://jd.com?data=' +  urlData + 
    '","shortenIfPossible":true}}';
    console.log('URL: ' + data);

    var opt = {  
        method: "POST",  
        host: "kamocu.com",  
        port: 80,  
        path: "/service.asmx/CreateCode",
        headers: {  
            "Content-Type": 'application/json; charset=UTF-8',  
            //"Content-Length": data.length  ,
            "referer": "http://kamocu.com/en/qrcode/",
            "X-Requested-With":"XMLHttpRequest"
        }  
    };  
    
    var req2 = http.request(opt, function (res1) {
        //console.log(res1.headers['set-cookie'][0]);
        res1.setEncoding('utf8');        
        res1.on('data', function(chunk) {
            
            //{"d":{"__type":"lab.CodeResult","status":"ok","id":1461942203,"myCodes":[{"id":1461942203,"kind":"Url","name":"http://jd.com","correctionLevel":"M"}],"throttleSec":0}}
            var dx = JSON.parse(chunk);
            var id = dx.d.myCodes[0].id;
            var cookie = res1.headers['set-cookie'][0];
            // console.log(dx.d.myCodes[0].id);
            // console.log(chunk);
            console.log('id:' + id);
            // res.send(cookie);
            //res.send(chunk);
            callback(id , cookie, res);
        });
        res1.on('end', function() {
            console.log(222)
        });
    });
    req2.write(data + "\n");  
    req2.end();  
}

function createQrCode2(id, cookie ,res){
    var http = require('http');    
    var opt3 =  {  
        method: "GET",  
        host: "kamocu.com",  
        port: 80,  
        path: "/qrcode.ashx?i=" + id,
        //path: '/', 
        headers: {  
            //"Content-Type": 'application/json; charset=UTF-8',  
            //"Content-Length": data.length  ,
            "referer": "http://kamocu.com/en/qrcode/",
            "cookie": cookie
        }  
    };  
    var req3 = http.request(opt3, function(res2){
        //var x = Date.now().toString() + '.png';
        
        res2.pipe(res);
    });
    req3.end();
}

module.exports = router;
