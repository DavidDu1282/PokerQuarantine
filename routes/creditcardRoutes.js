const mongoose = require("mongoose");
const requireAdmin = require("./middleware/requireAdmin");

const CC = mongoose.model("creditcards");
const express = require("express");
var router = express.Router();

// fetch user's creditcard
router.get("/creditcard", async (req, res) => {
  try {
    const cc = await CC.find({ owner: req.user.id });
    res.send(cc);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.post("/creditcard", async (req, res) => {
  const {
    name_on_card,
    card_number,
    expiration_date,
    ccv,
    postal_code,
    country,
  } = req.body;
  const cc = new CC({
    name_on_card,
    card_number,
    expiration_date,
    ccv,
    postal_code,
    country,
    owner: req.user._id,
  });

  try {
    await cc.save();
    res.send(cc);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.delete("/del/creditcard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    CC.findByIdAndRemove(id, (err, cc) => {
      if (err) return res.sendStatus(400);
      return res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
