const express = require("express");
const router = express.Router();
const controller = require("../controllers/line");

// LINE Bot TEST
router.post("/", controller.returnMessage);
// router.route('/').post(controller.returnMessage);

module.exports = router;