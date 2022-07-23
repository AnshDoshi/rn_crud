const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  title: String,
  isDone: Boolean,
});

module.exports = mongoose.model("User", userSchema);
