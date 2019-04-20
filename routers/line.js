const express = require("express");
const router = express.Router();
// const controller = require("../controllers/line");
const line = require("@line/bot-sdk");
// const config = require("../config/line.config");

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};

router.post("/", line.middleware(config), (req, res) => lineBot(req, res)); // 変更、middlewareを追加

function lineBot(req, res) {
  res.status(200).end();
  console.log("pass"); // 追加
}

// LINE Bot TEST
// router.post("/", line.middleware(config), controller.returnMessage);
// router.route('/').post(controller.returnMessage);

module.exports = router;