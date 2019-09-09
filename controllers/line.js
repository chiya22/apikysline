const line = require("@line/bot-sdk");
const config = require("../config/line.config");
const db = require("../models/line");
const cron = require("node-cron");

module.exports = {
  startCron: () => {
    const client = new line.Client(config);
    cron.schedule('* * * * *', () => {
      Promise.resolve(sendMessage("毎分実行")).catch(e=>console.log(e));
    });
    // cron.schedule('0 0 12 * * 1-5', () => {
    //   Promise.resolve(sendMessage("お昼ですよ")).catch(e=>console.log(e));
    // });
    // cron.schedule('0 0 13 * * 1-5', () => {
    //   Promise.resolve(sendMessage("午後が始まりますよ")).catch(e=>console.log(e));
    // });
    // cron.schedule('0 0 16 * * 1-5', () => {
    //   Promise.resolve(sendMessage("夕ご飯どうしますか？")).catch(e=>console.log(e));
    // });
    async function sendMessage(mes) {
      return client.pushMessage("Ub09377720f78d780eec5acac8eb075d4", {
        type: "text",
        text: mes
      })
    }
  },
  returnMessage: (req, res) => {

    const events = req.body.events;
    const client = new line.Client(config);
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.type === "message" && event.message.type === "text") {
        // const record = {
        //   replyToken: event.replyToken,
        //   userId: event.source.userId,
        //   messageId: event.message.id,
        //   message:event.message.text,
        // }
        // db.create(record, (err, data) => {
        //   if (err){
        //     console.log(err.message);
        //     throw new Error(err);
        //   }
        // })
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
