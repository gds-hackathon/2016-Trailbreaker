
var handler = function (req, res, next) {
  // message is located in req.weixin
  var message = req.weixin;
  console.log('receive message');
  console.log(req.weixin);

  var signatureHelper = new (require('../helpers/signatureHelper'))();

  if(message.FromUserName == 'otCTjtzgIIpuMfEOU9LJHcPlAi4A'){
    if(message.MsgType === 'text')
    {
        var ts = (Date.now());
        var nonce = guid() + message.FromUserName.toLowerCase();
        var signature = signatureHelper.computeSignature(ts, nonce);

        var urlPart = 'ts=' + ts + '&nonce=' + nonce + '&signature=' + signature;

        if(/^\s*(register|zhuce|注册)/i.test(message.Content)){ 
           var url = appConfig.BASE_URL + '/pages/registration' + '?' + urlPart;

            res.reply([
            {
              title: 'Discount',
              description: 'Discount message goes here. Welcome!',
              picurl: 'http://img13.360buyimg.com/cms/jfs/t3406/29/406493902/87685/b6e50be3/58087f30Nbadb1818.jpg',
              url: url
            }
          ]);
        }else if(/^\s*(discout|dazhe|打折)/i.test(message.Content)){
            var url = appConfig.BASE_URL + '/pages/transaction' + '?' + urlPart;
            res.reply([
            {
              title: 'Discount',
              description: 'Discount message goes here. Welcome!',
              picurl: 'http://img13.360buyimg.com/cms/jfs/t3406/29/406493902/87685/b6e50be3/58087f30Nbadb1818.jpg',
              url: url
            }
          ]);
        }
    }
    res.reply({
        type:'text',
        //content: JSON.stringify(message),
        content: 'Thank you for subscribe 程序员肖恩! \r\n'
        + 'Please input "register|zhuce|注册"for register if you are not a user\r\n'
        + 'Please input "discout|dazhe|打折" for to get discount! :)\r\n'
    });
  }
  /*
  if (message.FromUserName === 'wizardlsw') {
    // reply with text
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    // another way to reply with text
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // reply with music
    res.reply({
      type: "music",
      content: {
        title: "Just some music",
        description: "I have nothing to lose",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
      }
    });
  } else {
    // reply with thumbnails posts
    res.reply([
      {
        title: 'Come to fetch me',
        description: 'or you want to play in another way ?',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }*/
};


var wechat = require('wechat');

module.exports  = wechat(appConfig.wechat.token, handler);