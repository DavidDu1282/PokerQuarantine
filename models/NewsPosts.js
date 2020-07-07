const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewsPostSchema = new Schema({
  date: { type: Date },
  title: { type: String },
  body: { type: String },

  owner: { type: Schema.Types.ObjectId, ref: "users" },
});

mongoose.model("newsposts", NewsPostSchema);
