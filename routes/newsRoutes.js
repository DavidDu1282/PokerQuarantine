const mongoose = require("mongoose");
const requireAdmin = require("./middleware/requireAdmin");

const NewsPost = mongoose.model("newsposts");
const express = require("express");

var router = express.Router();

// fetch newsposts
router.get("/newspost", async (req, res) => {
  try {
    res.status(200);
    const newsPosts = await NewsPost.find({});
    res.send(newsPosts);
  } catch (err) {
    res.sendStatus(400);
  }
});

//fetch newspost id
router.get("/newspost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newsPosts = await NewsPost.find({ _id: id });
    res.send(newsPosts);
  } catch (err) {
    res.sendStatus(400);
  }
});

// post new newspost
router.post("/newspost", async (req, res) => {
  const { title, body } = req.body;
  var newNewsPosts = new NewsPost({
    title: title,
    body: body,
    date: new Date(),
  });
  try {
    const np = await newNewsPosts.save();
    res.send(np);
  } catch (err) {
    res.sendStatus(400);
  }
});

// delete newspost
router.delete("/del/newspost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    NewsPost.findByIdAndRemove(id, (err, newsPost) => {
      if (err) return res.sendStatus(400);
      return res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
