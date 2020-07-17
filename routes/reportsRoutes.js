const mongoose = require("mongoose");

const Reports = mongoose.model("reports");
const User = mongoose.model("users");
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

//  users submit report
router.post("/reports", async (req, res) => {
  const { type, info, defendant } = req.body;

  const report = new Reports({
    date: new Date(),
    actionTaken: false,
    type,
    info,
    defendant,
    reporter: req.user.name,
  });

  try {
    await report.save();
    res.send(report);
  } catch (err) {
    res.sendStatus(400);
  }
});

//get single report
router.get("/reports/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Reports.findById(id);
    res.send(report);
  } catch (err) {
    res.sendStatus(400);
  }
});

//update report and update accused user based on flagged value

router.post("/update/report/:id", async (req, res) => {
  const { flagged, defendant } = req.body;
  const { id } = req.params;
  try {
    if (flagged) {
      const user = await User.findOneAndUpdate(
        { username: defendant },
        { flag: true },
        (err, res) => {
          if (err) res.sendStatus(400);
        }
      );
    }
    const update = await Reports.findByIdAndUpdate(id, { actionTaken: true });
    res.sendStatus(200);
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
