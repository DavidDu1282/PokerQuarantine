const mongoose = require("mongoose");
const requireLogin = require("./middleware/requireLogin");

const NewsPost = mongoose.model("newsposts");

module.exports = (app) => {
  app.get("/api/get_newspost", requireLogin, async (req, res) => {
    const newsPosts = await NewsPost.find();

    res.send(newsPosts);
  });
};
