const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DogSchema = new Schema({
  url: { type: String, required: true, maxLength: 254 },
  rating: { type: Number },
  totalRatings: { type: Number, default: 0 },
});

module.exports = mongoose.model("Dog", DogSchema);
