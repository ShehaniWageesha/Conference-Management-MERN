const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Users = new Schema({
  name: {type: String,required: true, trim: true},
  type: { type: String,required: true, trim: true },
  email: {type: String,required: true, trim: true, unique: true,},
  password: {type: String,required: true, minlength: 4}, 
});

module.exports = mongoose.model("users", Users);