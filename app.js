const express = require('express');
const app = express();
const lineRouter = require('./routers/line');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/line', lineRouter);

module.exports = app;