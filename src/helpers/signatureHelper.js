var fsConfig = {
	token: 'Hackathon,JUSTgiveITa$h0t!'
};

function signatureHelper(){
    this.computeSignature = function(ts, nonce){
        var crypto = require('crypto');
        
        var arr = [fsConfig.token, ts, nonce].sort();
        var str = arr.join('');
        console.log('str to shasum: ' + str);
        
        var shasum = crypto.createHash('sha1');	
        shasum.update(str);
        var d = shasum.digest('hex');
        console.log('shasum: ' + d);
        return d;
    };
    
    this.checkSignature = function(ts/*timestamp*/, nonce, signature){
        // console.log('signature:' + signature);
        // console.log('ts:' + ts);
        // console.log('nonce:' + nonce);
        if(!ts || !nonce || !signature){
            //console.log('bad input');
            return false;
        }
        
        var d = this.computeSignature(ts, nonce);
        //console.log('signature calculated: ' + d);

        
        return signature == d;
    };
};
module.exports = signatureHelper;
