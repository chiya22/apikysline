const PORT = process.env.PORT || 8000;
const app = require("./app");

app.listen(PORT, () => {
  console.log(`bot server started :  ${PORT}`)
});


// const express = require("express");
// const PORT = process.env.PORT || 8000;
// const line = require("@line/bot-sdk"); // 追加
// // 追加
// const config = {
//   channelAccessToken: process.env.ACCESS_TOKEN,
//   channelSecret: process.env.SECRET_KEY
// };

// express()
//   .post("/hook/", line.middleware(config), (req, res) => lineBot(req, res)) // 変更、middlewareを追加
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// function lineBot(req, res) {
//   res.json({ test: "hook" });
//   console.log("pass"); // 追加
// }
