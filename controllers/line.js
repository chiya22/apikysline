const request = require("request");
const line = require("@line/bot-sdk");
const config = require("../config/line.config");

module.exports = {
  returnMessage: (req, res) => {
    // bodyのparseと署名のcheck
    line.middleware(config);
    res.status(200).end();
    const events = req.body.events;
    const client = new line.Client(config);
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.type === "message" && event.message.type === "text") {
        client.replyMessage(event.replyToken, event.message.text + "って言いましたね");
      }
    }
  }
};
