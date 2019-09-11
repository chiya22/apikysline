const line = require("@line/bot-sdk");
const config = require("../config/line.config");
const db = require("../models/line");
const cron = require("node-cron");

module.exports = {
  startCron: () => {
    const client = new line.Client(config);
    cron.schedule('0 0 12 * * 1-5', () => {
      Promise.resolve(sendMessage("お昼ですよ、メールしましょ")).catch(e=>console.log(e));
    });
    cron.schedule('0 0 13 * * 1-5', () => {
      Promise.resolve(sendMessage("午後が始まりますよ、メールしましょ")).catch(e=>console.log(e));
    });
    cron.schedule('0 0 16 * * 1-5', () => {
      Promise.resolve(sendMessage("夕ご飯どうしますか？メールしましょ")).catch(e=>console.log(e));
    });
    cron.schedule('0 0 9 28-31 * 1-5', () => {
      const date = new Date();
      const lastDate = getLastDayOfMonth(date.getFullYear(),date.getMonth())
      if (lastDate == date.getDate()){
        Promise.resolve(sendMessage("締資料作成しました？作成していないなら作成しましょ")).catch(e=>console.log(e));
      }
    });
    async function sendMessage(mes) {
      return client.pushMessage("Ub09377720f78d780eec5acac8eb075d4", {
        type: "text",
        text: mes
      })
    }
    function getLastDayOfMonth(year, month) {
      let date = new Date(year, month + 1, 0);
      return date.getDate();
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
        if (event.message.text === "bot帰れ") {
          client.leaveGroup(event.source.groupId)
          .then(() => {
              client.replyMessage(event.replyToken, {
                type: "text",
                text: `${event.source.groupId}から退室します。。。`
              });
          })
          .catch((err) => {
            console.log(err.message);
            throw new Error(err);
          });
          client.leaveRoom(event.source.roomId)
          .then(() => {
            client.replyMessage(event.replyToken, {
              type: "text",
              text: `${event.source.roomId}から退室します。。。`
            })
            .catch((err) => {
              console.log(err.message);
              throw new Error(err);
            });
          });
        }
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
