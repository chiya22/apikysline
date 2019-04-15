const request = require('request');

module.exports = {
  // オウム返し
  returnMessage: (req, res) => {
    const CH_ACCESS_TOKEN = '622ea6a8001a2653aaf89035c277e1c9'; //Channel Access Tokenを指定

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
