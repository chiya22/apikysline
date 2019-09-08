const line = require("@line/bot-sdk");
const config = require("../config/line.config");
const db = require("../models/line");


client.pushMessage('yo4da10mo8', {
  type: 'text',
  text: 'hello, world',
})

module.exports = {
  returnMessage: (req, res) => {

    const events = req.body.events;
    const client = new line.Client(config);
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.type === "message" && event.message.type === "text") {
        const record = {
          replyToken: event.replyToken,
          userId: event.source.userId,
          messageId: event.message.id,
          message:event.message.text,
        }
        db.create(record, (err, data) => {
          if (err){
            console.log(err.message);
            throw new Error(err);
          }
        })
        Promise.resolve(echoman(event)).catch(e=>console.log(e));
      }
    }
    async function echoman(ev) {
      const pro =  await client.getProfile(ev.source.userId);
      return client.replyMessage(ev.replyToken, {
        type: "text",
        text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
      })
    }
    
  }
};
