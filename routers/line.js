const express = require("express");
const router = express.Router();
const controller = require("../controllers/line");
const line = require("@line/bot-sdk");
const config = require("../config/line.config");

// LINE Bot TEST
router.post("/", line.middleware(config), (req,res) => controller.returnMessage(req,res));

controller.startCron();

module.exports = router;