const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String },
  email: { type: String },

  password: { type: String },
  username: { type: String },
  name: { type: String },
  dob: { type: Date },

  role: { type: Boolean },
  balance: { type: Number },
  games_played: { type: Number },
  wins: { type: Number },
  losses: { type: Number },
  credit_cards: [{ type: Schema.Types.ObjectId, ref: "creditcards" }],
});

mongoose.model("users", userSchema);
