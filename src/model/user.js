const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:false,
    },
    address: {
      type: String,
    },
    profilepic: {
      type: String,
    },
    token: {
      type: String,
    },
    // regdAt: { type: Date, default: Date.now },
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
