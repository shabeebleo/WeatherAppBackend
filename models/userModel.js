const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Name is required
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  password: {
    type: String,
    required: true, 
    minlength: 4, 
    maxlength: 20 
  }
});

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
