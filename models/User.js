const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

mongoose.model("users", userSchema);
