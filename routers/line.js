const express = require("express");
const router = express.Router();
const controller = require("../controllers/line");
const line = require("@line/bot-sdk");
const config = require("../config/line.config");

const express = require("express");
// const path = require("path");
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk"); // 追加
// 追加
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};

// express()
// .use(express.static(path.join(__dirname, "public")))
// .set("views", path.join(__dirname, "views"))
// .set("view engine", "ejs")
// .get("/", (req, res) => res.render("pages/index"))
// .get("/g/", (req, res) => res.json({ method: "こんにちは、getさん" }))
// .post("/p/", (req, res) => res.json({ method: "こんにちは、postさん" }))
router.post("/line/", line.middleware(config), (req, res) => lineBot(req, res)); // 変更、middlewareを追加
// .listen(PORT, () => console.log(`Listening on ${PORT}`));

function lineBot(req, res) {
  res.json({ test: "hook" });
  console.log("pass"); // 追加
}

// LINE Bot TEST
// router.post("/", line.middleware(config), controller.returnMessage);
// router.route('/').post(controller.returnMessage);

module.exports = router;