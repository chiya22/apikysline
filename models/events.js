const config = require("../config/dbconfig.js");
const { Client } = require("pg");

// apikysline::DATABASE=> create table events(
//   apikysline::DATABASE(> eventId varchar(12) primary key,
//   apikysline::DATABASE(> eventContent varchar(100) not null,
//   apikysline::DATABASE(> created_timestamp timestamp);

// ■ findAll
const findAll = ((callback) => {
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from events order by created_timestamp";
  query.values = [];
  //一覧の取得
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result);
  });
});

// ■ find
const find = ((eventId, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from events where eventId = $1";
  query.values = [eventId];
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
const create = ((event, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "insert into events(eventId, eventContent, created_timestamp) values ($1,$2,$3)";
  query.values = [event.eventId, event.eventContent, new Date()];

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
  find: find,
  create: create
};
