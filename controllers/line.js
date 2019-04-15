const request = require('request');

module.exports = {
  // オウム返し
  returnMessage: (req, res) => {
    // const CH_ACCESS_TOKEN = '622ea6a8001a2653aaf89035c277e1c9'; //Channel Access Tokenを指定
    const CH_ACCESS_TOKEN = 'MCCA8E/dgoRwDsKVAT1B1qpzz8Jt16Kcjvasuv+oK++0+46eyBd7nD2xhI5y33GrZThpK7T8S1JxPRYN7WtdYKj6wjeZ2mmrcizIB8lxxJ9f5iT4e9zD/Dvim/gNwOE3l8rqpeeG+e7FV1WKrvdrogdB04t89/1O/w1cDnyilFU='; //Channel Access Tokenを指定
    
    // Lineプラットフォームから送信されてきたイベントを取得
    let WebhookEventObject = JSON.parse(req.body).events[0];

    if (WebhookEventObject.type !== 'message') {
      return;
    }
    if (WebhookEventObject.message.type !== 'text') {
      return;
    }

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {' + CH_ACCESS_TOKEN + '}',
    };

    var data = {
      'replyToken': WebhookEventObject.replyToken,
      "messages": [{
        type: 'text',
        text: WebhookEventObject.message.text
      }]
    };

    var options = {
      url: 'https://api.line.me/v2/bot/message/reply',
      // proxy: process.env.FIXIE_URL, Proxyサーバの設定はいるの？
      headers: headers,
      json: true,
      body: data
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body); // POST後にbodyには何が設定されるのか？
      } else {
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }
};
