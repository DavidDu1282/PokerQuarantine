const mongoose = require("mongoose");

const Reports = mongoose.model("reports");
const express = require("express");
var router = express.Router();

//Admin fetch all reportings
router.get("/reports", async (req, res) => {
  try {
    const reports = await Reports.find({});
    res.send(reports);
  } catch (err) {
    res.sendStatus(400);
  }
});

// Regular users submit report
router.post("/reports", async (req, res) => {
  const { type, info, defendant } = req.body;
  const report = new Reports({
    date: new Date(),
    actionTaken: false,
    type,
    info,
    defendant,
    reporter: req.user._id,
  });

  try {
    await report.save();
    res.send(report);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.delete("/del/reports/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Reports.findByIdAndRemove(id, (err, cc) => {
      if (err) return res.sendStatus(400);
      return res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
