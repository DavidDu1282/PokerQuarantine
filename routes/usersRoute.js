const mongoose = require("mongoose");
const User = mongoose.model("users");
const express = require("express");

var router = express.Router();

/*POST update win */
router.post("/update/win", (req, res) => {
  const { id } = req.body;

  User.updateOne(
    { userId: id },
    { $inc: { wins: 1, games_played: 1 } },
    (err, user) => {
      if (err) {
        res.sendStatus(400);
        return;
      }
      res.sendStatus(200);
      return;
    }
  );
});

/*POST update losses */
router.post("/update/lose", (req, res) => {
  const { id } = req.body;

  User.updateOne(
    { userId: id },
    { $inc: { losses: 1, games_played: 1 } },
    (err, user) => {
      if (err) {
        res.sendStatus(400);
        return;
      }
      res.sendStatus(200);
      return;
    }
  );
});

/*POST update gain balance */
router.post("/update/chips/gain/:amount", (req, res) => {
  const { id } = req.body;
  const { amount } = req.params;

  User.updateOne({ userId: id }, { $inc: { balance: amount } }, (err, user) => {
    if (err) {
      res.sendStatus(400);
      return;
    }
    res.sendStatus(200);
    return;
  });
});

router.post("/update/chips/loss/:amount", (req, res) => {
  const { id } = req.body;
  const { amount } = req.params;

  User.updateOne(
    { userId: id },
    { $inc: { balance: -amount } },
    (err, user) => {
      if (err) {
        res.sendStatus(400);
        return;
      }
      res.sendStatus(200);
      return;
    }
  );
});

module.exports = router;
