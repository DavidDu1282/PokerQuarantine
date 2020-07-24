const mongoose = require("mongoose");
const User = mongoose.model("users");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
var router = express.Router();

/* fetch data */
router.get("/top10", async (req, res) => {
  const top10 = await User.find({}).sort({ wins: -1 }).limit(10);

  res.send(top10);
  return;
});

module.exports = router;
