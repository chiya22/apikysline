const config = require("../config/dbconfig.js");
const { Client } = require("pg");

// apikysline::DATABASE=> create table schedules(
//   apikysline::DATABASE(> scheduleId varchar(12) primary key,
//   apikysline::DATABASE(> scheduleContent varchar(100) not null,
//   apikysline::DATABASE(> created_timestamp timestamp);

// ■ findAll
const findAll = ((callback) => {
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from schedules order by created_timestamp";
  query.values = [];
  //一覧の取得
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    console.log(result);
    callback(null, result);
  });
});

// ■ find
const find = ((scheduleId, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from schedules where scheduleId = $1";
  query.values = [scheduleId];
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
const create = ((schedule, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "insert into schedules(scheduleId, scheduleContent, created_timestamp) values ($1,$2,$3)";
  query.values = [schedule.scheduleId, schedule.scheduleContent, new Date()];

  // INSERT
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    client.end()
      .catch((err) => {
        throw err;
      });
    console.log(result);
    callback(null, result.rows[0]);
  });
});

module.exports = {
  findAll: findAll,
  find: find,
  create: create
};
