const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  actionTaken: { type: Boolean },
  date: { type: Date },
  type: { type: String },
  info: { type: String },
  defendant: { type: Schema.Types.ObjectId, ref: "users", required: true },
  reporter: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

mongoose.model("reports", reportSchema);
