const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PageDetails = new Schema({
  title: {type: String,required: true, trim: true},
  description: {type: String, required: true,trim: true},
  date: {type: String, required: true, trim: true},
  time: {type: String, required: true, trim: true},
  approval: {type: Boolean},
  file_path: {type: String},
  file_mimetype: {type: String}
},
{
  timestamps: true
  }
);

module.exports = mongoose.model("pages", PageDetails);