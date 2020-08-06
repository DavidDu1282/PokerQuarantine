const mongoose = require("mongoose");
const { Schema } = mongoose;

const Message = new Schema({
  messageId: { type: String },
  userId: { type: String },
  channelId: { type: String },
  context: { type: String },
  timestamp: { type: Date },
});

mongoose.model("messages", Message);
