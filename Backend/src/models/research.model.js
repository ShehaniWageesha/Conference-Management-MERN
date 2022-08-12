const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let fileSchema  = new Schema({
  title: {type: String,required: true, trim: true},
  description: {type: String, trim: true},
  author: {type: String, required: true, trim: true},
  approval: {type: Boolean},
  file_path: {type: String, required: true},
  file_mimetype: {type: String,required: true}
},
  {
  timestamps: true
  }
);

module.exports = mongoose.model("File", fileSchema );