const mongoose = require("mongoose");
const { Schema } = mongoose;

const Channel = new Schema({
  channelId: { type: String },
  channelName: { type: String },
  accessUsers: { type: [String] },
  messages: {type: [String]},
});

mongoose.model("channels", Channel);
