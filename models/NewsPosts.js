const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewsPostSchema = new Schema({
  date: { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

mongoose.model("newsposts", NewsPostSchema);
