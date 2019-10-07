const config = require("../config/dbconfig.js");
const { Client } = require("pg");

// heroku pg:psql --app xxxx
//
// apikysline::DATABASE=> create table unkou(
//   apikysline::DATABASE(> url varchar(200) primary key,
//   apikysline::DATABASE(> status varchar(200) not null,
//   apikysline::DATABASE(> updated_timestamp timestamp);

// ■ find
const find = ((key, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "select * from unkous where url = $1";
  query.values = [key];
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
const create = ((unkou, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "insert into unkous(url, status, updated_timestamp) values ($1,$2,$3)";
  query.values = [unkou.url, unkou.status, new Date()];

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
const update = ((url, status, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "update unkous set status = $1 where url = $2";
  query.values = [status, url];

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
const remove = ((url, callback) => {
  // connect
  const client = new Client(config);
  client.connect();

  let query = {};
  query.text = "delete from unkous where url = $1";
  query.values = [url];

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
  find: find,
  create: create,
  update: update,
  delete: remove
};
