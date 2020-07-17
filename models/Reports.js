const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  actionTaken: { type: Boolean, default: false },
  date: { type: Date },
  type: { type: String },
  info: { type: String },
  defendant: { type: String, required: true },
  reporter: { type: String, required: true },
});

mongoose.model("reports", reportSchema);
