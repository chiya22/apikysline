const express = require("express");
const app = express();
const indexRouter = require("./routers/index");
const lineRouter = require("./routers/line");
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/line", lineRouter);

const controller = require("./controllers/line")
console.log("sssssstart");
controller.sendPushMessage("このメッセージが送信されるはずですよね？");
console.log("eeeeeeend");


module.exports = app;
