const mongoose = require("mongoose");
const requireLogin = require("./middleware/requireLogin");

const NewsPost = mongoose.model("newsposts");

module.exports = (app) => {
  app.get("/api/newspost", requireLogin, async (req, res) => {
    const newsPosts = await NewsPost.find();

    res.send(newsPosts);
  });

  app.post("/api/newspost", requireLogin, async (req, res) => {
    const { title, body } = req.body;
    var newNewsPosts = new NewsPost({
      title: title,
      body: body,
      owner: req.user._id,
    });
    newNewsPosts.save();
    res.send(200);
  });
};
