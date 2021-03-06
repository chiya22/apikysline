const line = require("@line/bot-sdk");
const config = require("../config/line.config");
const db = require("../models/schedules");
const cron = require("node-cron");
const dbUnkous = require("../models/unkous");
const request = require('request')
const { JSDOM } = require('jsdom');
const iconv = require("iconv-lite");

module.exports = {
  startCron: () => {
    const client = new line.Client(config);
    // ■占い
    // cron.schedule('0 */5 * * * *', () => {
    cron.schedule('0 0 7 * * *', () => {
      url = 'http://www.houigaku.net/01_hon_getsu/08year.html'
      request({ url: url, encoding: null }, (e, response, body) => {
        if (e) {
          console.error(e)
        }
        try {
          body = iconv.decode(body, 'Shift-JIS')
          const dom = new JSDOM(body)
          const uranailist = dom.window.document.getElementsByClassName('col-r')
          let uranairesult = uranailist[0].innerHTML.trim()
          //</h3>までカット
          uranairesult = uranairesult.slice(uranairesult.indexOf("</h3>") + 5)
          //<div class="bday-input">以降をカット
          uranairesult = uranairesult.slice(0, uranairesult.indexOf('<div class="bday-input">'))
          Promise.resolve(sendMessage(`${uranairesult}`)).catch(e => console.log(e))
        } catch (e) {
          console.error(e)
        }
      })
    })
    // ■運行状況用
    // cron.schedule('0 */59 * * * *', () => {
    //   //中央総武線、京成
    //   const urlarray = [
    //     'http://www.jikokuhyo.co.jp/search/detail/line_is/kanto_chuosobu',
    //     'http://www.jikokuhyo.co.jp/search/detail/line_is/kanto_keisei'
    //   ]
    //   urlarray.forEach((url) => {
    //     request(url, (e, response, body) => {
    //       if (e) {
    //         console.error(e)
    //       }
    //       try {
    //         const dom = new JSDOM(body)
    //         const title = dom.window.document.getElementsByTagName('title')[0].innerHTML.trim()
    //         const statuslist = dom.window.document.getElementsByClassName('corner_block_row_detail_d')
    //         let concatStatus;
    //         for (var i = 0; i < statuslist.length; i++) {
    //           if (concatStatus != null) {
    //             concatStatus += `■${statuslist[i].innerHTML.trim()}\n`
    //           } else {
    //             concatStatus = `■${statuslist[i].innerHTML.trim()}\n`
    //           }
    //         }
    //         checkStatusUnko(url, title, concatStatus)
    //       } catch (e) {
    //         console.error(e)
    //       }
    //     })
    //   })
    // })
    // ■スケジュール登録用
    //  cron.schedule('0 */5 * * * *', () => {
    // cron.schedule('0 0 7 * * *', () => {
    //   db.findAll((err, data) => {
    //     if (err) {
    //       console.log(err.message);
    //       throw new Error(err);
    //     } else {
    //       for (i = 0; i < data.rowCount; i++) {
    //         if (checkDayAgo(data.rows[i].schedule_id, 5)) {
    //           let returnMessage = `予定が近づいています...。\n-----\n\n日時：${data.rows[i].schedule_id}\nコンテンツ：${data.rows[i].schedule_content}\n登録者：${data.rows[i].created_username}\n-----\n`;
    //           Promise.resolve(sendMessage(returnMessage)).catch(e => console.log(e));
    //         }
    //       }
    //     }
    //   })
    // });
    // cron.schedule('0 59 23 * * *', () => {
    //   const date = new Date();
    //   db.findAll((err, data) => {
    //     if (err) {
    //       console.log(err.message);
    //       throw new Error(err);
    //     } else {
    //       for (i = 0; i < data.rowCount; i++) {
    //         if (checkDayAgo(data.rows[i].schedule_id, 0)) {
    //           let returnMessage = `この予定は過去になりました。\n-----\n\n日時：${data.rows[i].schedule_id}\nコンテンツ：${data.rows[i].schedule_content}\n登録者：${data.rows[i].created_username}\n-----\n`;
    //           Promise.resolve(sendMessage(returnMessage)).catch(e => console.log(e));
    //         }
    //       }
    //     }
    //   })
    // });
    // ■個人用
    // cron.schedule('0 0 12 * * 1-5', () => {
    //   Promise.resolve(sendMessage("お昼ですよ、メールしましょ")).catch(e => console.log(e));
    // });
    // cron.schedule('0 0 13 * * 1-5', () => {
    //   Promise.resolve(sendMessage("午後が始まりますよ、メールしましょ")).catch(e => console.log(e));
    // });
    // cron.schedule('0 0 16 * * 1-5', () => {
    //   Promise.resolve(sendMessage("夕ご飯どうしますか？メールしましょ")).catch(e => console.log(e));
    // });
    // cron.schedule('0 0 9 28-31 * 1-5', () => {
    //   const date = new Date();
    //   const lastDate = getLastDayOfMonth(date.getFullYear(), date.getMonth())
    //   if (lastDate == date.getDate()) {
    //     Promise.resolve(sendMessage("締資料作成しました？\n作成していないなら作成しましょ")).catch(e => console.log(e));
    //   }
    // });
    // cron.schedule('0 0 9 21 * *', () => {
    //   const date = new Date();
    //   const lastDate = getLastDayOfMonth(date.getFullYear(), date.getMonth())
    //   if (lastDate == date.getDate()) {
    //     Promise.resolve(sendMessage("携帯代を経費精算作成しましたか？\n作成していないなら作成しましょ")).catch(e => console.log(e));
    //   }
    // });
    // ■運行状況用
    // function checkStatusUnko(url, title, status) {
    //   dbUnkous.find(url, (err, data) => {
    //     if (err) {
    //       console.log(err);
    //       throw new Error(err);
    //     }
    //     if (data) {
    //       if (status != data.status) {
    //         dbUnkous.update(url, status, (err, data) => {
    //           if (err) {
    //             console.log(err);
    //             throw new Error(err);
    //           }
    //           Promise.resolve(sendMessage(`${title}\n${status}`)).catch(e => console.log(e))
    //         })
    //       }
    //     } else {
    //       const unkou = {
    //         url: url,
    //         status: status
    //       }
    //       console.log(`create:${status}`)
    //       dbUnkous.create(unkou, (err, data) => {
    //         if (err) {
    //           console.log(err)
    //           throw new Error(err)
    //         }
    //         Promise.resolve(sendMessage(`${title}\n${status}`)).catch(e => console.log(e))
    //       })
    //     }
    //   })
    // }
    // function getLastDayOfMonth(year, month) {
    //   let date = new Date(year, month + 1, 0);
    //   return date.getDate();
    // }
    // function checkDayAgo(str, days) {
    //   let dayago = new Date();
    //   dayago.setDate(dayago.getDate() + days);
    //   const dayagoYYYY = dayago.getFullYear();
    //   const dayagoMM = ("0" + dayago.getMonth() + 1).slice(-2);
    //   const dayagoDD = ("0" + dayago.getDate()).slice(-2);
    //   if ((str.substr(0, 4) == dayagoYYYY) && (str.substr(4, 2) == dayagoMM) && (str.substr(6, 2) == dayagoDD)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    async function sendMessage(mes) {
      return client.pushMessage("Ub09377720f78d780eec5acac8eb075d4", {
        type: "text",
        text: mes
      })
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
        let mes;
        //自分以外で照会コマンド以外を受信した場合には「...」を返答するのみとする
        if (event.source.userId !== "Ub09377720f78d780eec5acac8eb075d4" && recieveContentList[0] !== "照会") {
          Promise.resolve(returnMessage(event, "..."));
        }
        if (recieveContentList[0] === "登録") {
          mes = checkRecieveContentForInsert(recieveContentList)
          if (mes === null) {
            Promise.resolve(createSchedule(event, recieveContentList[1], recieveContentList[2])).catch(e => console.log(e));
          } else {
            Promise.resolve(returnMessage(event, mes));
          }
        }
        else if (recieveContentList[0] === "削除") {
          mes = checkRecieveContentForDelete(recieveContentList)
          if (mes === null) {
            Promise.resolve(deleteSchedule(event, recieveContentList[1])).catch(e => console.log(e));
          } else {
            Promise.resolve(returnMessage(event, mes));
          }
        }
        else if (recieveContentList[0] === "更新") {
          mes = checkRecieveContentForUpdate(recieveContentList)
          if (mes === null) {
            Promise.resolve(updateSchedule(event, recieveContentList[1], recieveContentList[2])).catch(e => console.log(e));
          } else {
            Promise.resolve(returnMessage(event, mes));
          }
        }
        else if (recieveContentList[0] === "照会") {
          Promise.resolve(returnSchedules(event)).catch(e => console.log(e));
        }
        else if (event.message.text === "ID") {
          //現在のIDとチャットのIDを返却する
          let mes = `userID:${event.source.userId}`;
          if (event.source.type === "group") {
            mes = mes + `\nchatID:${event.source.groupId}`;
          } else if (event.source.type === "room") {
            mes = mes + `\nchatID:${event.source.roomId}`;
          }
          Promise.resolve(returnMessage(event, mes));
        }
        else if (event.message.text === "bot帰れ") {
          //チャットに登録されている場合、チャットから退室させる
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
      }
    }
    //登録時のチェック
    function checkRecieveContentForInsert(recieveContentList) {
      if (recieveContentList.length !== 3) {
        return "登録する日時を2行目に、\n登録する内容を3行目に設定してください。"
      }
      if (recieveContentList[1].length !== 12) {
        return "登録する日時は12桁（yyyyMMddHHmm）で設定してください。"
      }
      if (!checkStringToDate(recieveContentList[1])) {
        return "登録する日時はyyyyMMddHHmm形式で設定してください。"
      }

      db.find(recieveContentList[1], (err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          if (data) {
            return "すでに登録されている日時です。\n2行目の設定値を確認してください。";
          }
        }
      })

      return null;
    }
    //削除時のチェック
    function checkRecieveContentForDelete(recieveContentList) {
      if (recieveContentList.length !== 2) {
        return "削除する日時を2行目に設定してください。"
      }

      db.find(recieveContentList[1], (err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          if (!data) {
            return "削除する対象が存在しません。\n2行目の設定値を確認してください。";
          }
        }
      })

      return null;
    }
    //更新時のチェック
    function checkRecieveContentForUpdate(recieveContentList) {
      if (recieveContentList.length !== 3) {
        return "更新する日時を2行目に、\n更新する内容を3行目に設定してください。"
      }

      db.find(recieveContentList[1], (err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          if (!data) {
            return "更新する対象が存在しません。\n2行目の設定値を確認してください。";
          }
        }
      })

      return null;
    }
    //文字列の日付チェック
    function checkStringToDate(str) {
      const y = parseInt(str.substr(0, 4));
      const m = parseInt(str.substr(4, 2)) - 1;
      const d = parseInt(str.substr(6, 2));
      const h = parseInt(str.substr(8, 2));
      const s = parseInt(str.substr(10, 2));
      const dt = new Date(y, m, d, h, s);
      if (y === dt.getFullYear() && m === dt.getMonth() && d === dt.getDate() && h === dt.getHours() && s === dt.getMinutes()) {
        return true;
      } else {
        return false;
      }
    }
    //登録処理
    async function createSchedule(ev, schedule_id, schedule_content) {
      const pro = await client.getProfile(ev.source.userId);
      const record = {
        schedule_id: schedule_id,
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
    //更新処理
    async function updateSchedule(ev, schedule_id, schedule_content) {
      db.update(schedule_id, schedule_content, (err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          return client.replyMessage(ev.replyToken, {
            type: "text",
            text: "更新しました。"
          })
        }
      })
    }
    //削除処理
    async function deleteSchedule(ev, schedule_id) {
      db.delete(schedule_id, (err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          return client.replyMessage(ev.replyToken, {
            type: "text",
            text: "削除しました。"
          })
        }
      })
    }
    //照会処理
    async function returnSchedules(ev) {
      db.findAll((err, data) => {
        if (err) {
          console.log(err.message);
          throw new Error(err);
        } else {
          if (data.rowCount === 0) {
            return client.replyMessage(ev.replyToken, {
              type: "text",
              text: "1件も登録されていません。"
            })
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
        }
      })
    }
    //メッセージ返却処理
    async function returnMessage(ev, mes) {
      return client.replyMessage(ev.replyToken, {
        type: "text",
        text: mes
      });
    }
  }
};
