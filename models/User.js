const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String },
  googleId: { type: String },
  email: { type: String },

  password: { type: String },

  name: { type: String },
  dob: { type: Date },

  role: { type: Number },
  balance: { type: Number },
  games_played: { type: Number },
  wins: { type: Number },
  losses: { type: Number },
  flag: { type: Boolean, default: false },

  avatar_url: { type: String },
});

mongoose.model("users", userSchema);
