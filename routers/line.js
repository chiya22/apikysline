const express = require("express");
const router = express.Router();
const controller = require("../controllers/line");
const line = require("@line/bot-sdk");
const config = require("../config/line.config");

// const config = {
//   channelAccessToken: process.env.ACCESS_TOKEN,
//   channelSecret: process.env.SECRET_KEY
// };

// LINE Bot TEST
router.post("/", (req,res) => controller.returnMessage(req,res));
// router.route('/').post(controller.returnMessage);

module.exports = router;