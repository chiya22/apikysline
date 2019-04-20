const line = require("@line/bot-sdk");
const config = require("../config/line.config");
// const db = require("../models/line");

module.exports = {
  returnMessage: (req, res) => {

    const events = req.body.events;
    const client = new line.Client(config);
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.type === "message" && event.message.type === "text") {
        // const record = {
        //   replyToken: event.replyToken,
        //   userId: event.source.userId,
        //   userName: "",
        //   messageId: event.message.id,
        //   message:event.message.text,
        //   cretaed_timestamp: event.timestamp
        // }
        // db.create(record, (err, data) => {
        //   if (err){
        //     console.log(err.message);
        //     throw new Error(err);
        //   }
        // })
        // const promises = [];
        // promises.push(echoman(event))
        // Promise.all(promises).then(console.log("pass")).catch(e => console.log(e));
        Promise.resoleve(echoman(event()).catch(e=>console.log(e)));
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



