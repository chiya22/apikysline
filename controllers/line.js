const line = require("@line/bot-sdk");
const config = require("../config/line.config");
const db = require("../models/schedules");
const cron = require("node-cron");

module.exports = {
  startCron: () => {
    const client = new line.Client(config);
    cron.schedule('0 0 12 * * 1-5', () => {
      Promise.resolve(sendMessage("お昼ですよ、メールしましょ")).catch(e => console.log(e));
    });
    cron.schedule('0 0 13 * * 1-5', () => {
      Promise.resolve(sendMessage("午後が始まりますよ、メールしましょ")).catch(e => console.log(e));
    });
    cron.schedule('0 0 16 * * 1-5', () => {
      Promise.resolve(sendMessage("夕ご飯どうしますか？メールしましょ")).catch(e => console.log(e));
    });
    cron.schedule('0 0 9 28-31 * 1-5', () => {
      const date = new Date();
      const lastDate = getLastDayOfMonth(date.getFullYear(), date.getMonth())
      if (lastDate == date.getDate()) {
        Promise.resolve(sendMessage("締資料作成しました？作成していないなら作成しましょ")).catch(e => console.log(e));
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

    //　最初にstatusを正常に設定しておく
    res.status(200).end();

    const events = req.body.events;
    const client = new line.Client(config);
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.type === "message" && event.message.type === "text") {
        let recieveContentList = event.message.text.split("\n");
        if (recieveContentList[0] === "追加") {

          validateInsert(recieveContentList, (err, data) => {
            if (err) {
              returnMessage(event,err.message);
            } else {
              Promise.resolve(createSchedule(event, recieveContentList[1], recieveContentList[2])).catch(e => console.log(e));
            }
          });
      }
        else if (recieveContentList[0] === "照会") {
          Promise.resolve(returnSchedules(event)).catch(e => console.log(e));
        }
        else if (event.message.text === "bot帰れ") {
          if (event.source.type === "group") {
            client.leaveGroup(event.source.groupId)
              .then(() => {
              })
              .catch((err) => {
                console.log(err.message);
                throw new Error(err);
              });
          }
          if (event.source.type === "room") {
            client.leaveRoom(event.source.roomId)
              .then(() => {
              })
              .catch((err) => {
                console.log(err.message);
                throw new Error(err);
              });
          };
        }
        else {
          Promise.resolve(returnMessage(event,"コマンドが誤っています。\n以下のリファレンスに従ってコマンドを送信してください。\n1行目：照会/追加/更新/削除\n2行目：日時をyyyyMMddHHmm形式で記入\n3行目：スケジュールの内容を記載")).catch(e => console.log(e));
        }
      }
    }
    function validateInsert(recieveContentList, callback) {
      if (recieveContentList.length === 2){
        err.message = "引数の数が違います";
        callback(err,null);
      }
    }
    async function createSchedule(ev, shcedule_id, schedule_content) {
      const pro = await client.getProfile(ev.source.userId);
      const record = {
        schedule_id: shcedule_id,
        schedule_content: schedule_content,
        created_username: pro.displayName
      }
      db.create(record, (err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          return client.replyMessage(ev.replyToken, {
            type: "text",
            text: "登録しました。"
          })
        }
      })
    }
    async function returnSchedules(ev) {
      db.findAll((err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          let returnMessage = `全部で${data.rowCount}件登録されています。\n-----\n`;
          for (i = 0; i < data.rowCount; i++) {
            returnMessage += `日時：${data.rows[i].schedule_id}\nコンテンツ：${data.rows[i].schedule_content}\n登録者：${data.rows[i].created_username}\n-----\n`;
          }
          return client.replyMessage(ev.replyToken, {
            type: "text",
            text: returnMessage
          })
        }
      })
    }
    async function returnMessage(ev, mes) {
      return client.replyMessage(ev.replyToken, {
        type: "text",
        text: mes
      });
    }
  }
};
