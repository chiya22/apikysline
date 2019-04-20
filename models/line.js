const config = require("../config/dbconfig.js");
const { Client } = require("pg");

// replyToken: varchar(100)
// userId:varchar(100)
// userName:varchar(100)
// messageId:varchar(100)
// message:varchar(100)
// created_timestamp:timestamp

// ■ findAll
const findAll = ((callback) => {
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from messages";
  query.values = [];
  //一覧の取得
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result);
  });
});

// ■ findAllByKey
const findAllByKey = ((query_value, callback) => {
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from messages where userId = $1 order by created_timestamp";
  query.values = [query_value];
  //一覧の取得
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result);
  });
});

// ■ find
const find = ((messageId, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from messages where messageId = $1";
  query.values = [messageId];
  // 1件取得
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    client.end()
      .catch((err) => {
        throw err;
      });
    callback(null, result.rows[0]);
  });
});

// ■ create
const create = ((line, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "insert into messages(replyToken, userId, messageId, message, created_timestamp) values ($1,$2,$3,$4,$5)";
  query.values = [line.replyToken, line.userId, line.messageId, line.message, line.created_timestamp];

  // INSERT
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    client.end()
      .catch((err) => {
        throw err;
      });
    callback(null, result.rows[0]);
  });
});

module.exports = {
  findAll: findAll,
  findAllByKey: findAllByKey,
  find: find,
  create: create
};
