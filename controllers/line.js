module.exports = {
  returnMessage: (req, res) => {
    const CH_SECRET = 'xxxxxxxx';      //Channel Secretを指定
    const CH_ACCESS_TOKEN = 'xxxxxx'; //Channel Access Tokenを指定

    // Lineプラットフォームから送信されてきたイベントを取得
    let WebhookEventObject = JSON.parse(req.body).events[0];
    if (WebhookEventObject.type === 'message') {
      let SendMessageObject;
      if (WebhookEventObject.message.type === 'text') {
        SendMessageObject = [{
          type: 'text',
          text: WebhookEventObject.message.text
        }];
      }

      var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + CH_ACCESS_TOKEN + '}',
      };

      var data = {
        'replyToken': WebhookEventObject.replyToken,
        "messages": SendMessageObject
      };

      var options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        // proxy: process.env.FIXIE_URL,
        headers: headers,
        json: true,
        body: data
      };

      request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        } else {
          console.log('error: ' + JSON.stringify(response));
        }
      });
    }
  }

};
