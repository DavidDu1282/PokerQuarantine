const mongoose = require("mongoose");
const { Schema } = mongoose;

const ccSchema = new Schema({
  name_on_card: { type: String },
  card_number: { type: Number },
  expiration_date: { type: Date },
  ccv: { type: String },
  postal_code: { type: String },
  country: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "users" },
});

mongoose.model("creditcards", ccSchema);
