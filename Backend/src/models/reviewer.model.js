const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Reviews = new Schema({
  title: {type: String,required: true, trim: true},
  description: {type: String, trim: true},
  author: {type: String, required: true, trim: true},
  file: {type: String, required: true, trim: true},
  decisions: {type: String, required: true, trim: true},
});

module.exports = mongoose.model("reviews", Reviews);