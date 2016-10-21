function checkSignature(req, res, next){
  
    console.log(req.urlencoded);
  var isValid = false;
  if(req.query.nonce && req.query.ts && req.query.signature){
    var signatureHelper = new (require('../helpers/signatureHelper'))();
    //var s = signatureHelper.computeSignature(req.query.ts, req.query.nonce);
    isValid = signatureHelper.checkSignature(req.query.ts, req.query.nonce, req.query.signature);
    console.log('check result:' + isValid);

    if(isValid) {        
        // console.log(Date.now());
        // console.log(req.query.ts);
        if(Math.abs(Date.now() - parseInt(req.query.ts)) > appConfig.tokenLifespan){
            next(); //TODO ...
            //res.render('error',{title : 'Bad request', message : 'Session expired. Please close this page and retry again.', error:{}})
        }else{
          next();
        }
    }
  }

  if(!isValid){
     res.render('error',{title : 'Bad request', message : 'Invalid parameter', error:{}})
  }
};

module.exports = checkSignature;