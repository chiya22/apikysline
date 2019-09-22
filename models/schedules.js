const config = require("../config/dbconfig.js");
const { Client } = require("pg");

// apikysline::DATABASE=> create table schedules(
//   apikysline::DATABASE(> schedule_id varchar(12) primary key,
//   apikysline::DATABASE(> schedule_content varchar(100) not null,
//   apikysline::DATABASE(> created_username varchar(100),
//   apikysline::DATABASE(> created_timestamp timestamp);

// ■ findAll
const findAll = ((callback) => {
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from schedules order by schedule_id";
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
const find = ((schedule_id, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from schedules where schedule_id = $1";
  query.values = [schedule_id];
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
  query.text = "insert into schedules(schedule_id, schedule_content, created_username, created_timestamp) values ($1,$2,$3,$4)";
  query.values = [schedule.schedule_id, schedule.schedule_content, schedule.created_username, new Date()];

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

// ■ update
const update = ((schedule_id, schedule_content, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "update schedules set schedule_content = $1 where schedule_id = $2";
  query.values = [schedule_content, schedule_id];

  // UPDATE
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

// ■ remove
const remove = ((schedule_id, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "delete from schedules where schedule_id = $1";
  query.values = [schedule_id];

  // DELETE
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
  create: create,
  update: update,
  delete: remove
};
