const express = require("express");
const router = express.Router();

// LINE Bot TEST
router.get("/", (req,res) => {
  res.status(200).end;
  res.json({result:"OK"});
});

module.exports = router;