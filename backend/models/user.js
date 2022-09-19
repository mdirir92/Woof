const mongoose = require("mongoose");
const DogSchema = require("./dog");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favourites: [String],
});

module.exports = mongoose.model("User", UserSchema);
