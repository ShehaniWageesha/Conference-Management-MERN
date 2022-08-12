const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Usertype = new Schema({
  name: {type: String,required: true, trim: true},
  users: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users' }],
});

module.exports = mongoose.model("usertype", Usertype);