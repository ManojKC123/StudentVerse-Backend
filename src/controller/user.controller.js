require("../../config/db_connection");
const User = require("../model/user");
const userController = require("../controller/user.controller");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  const data = req.body;
  const password = data.password;

  const hash = await bcrypt.hash(password, 7);
  const uNameE = data.email.substring(0, data.email.indexOf("@"));
  console.log("test");
  let user = new User({
    fname: data.fname,
    lname: data.lname,
    email: data.email,
    username: uNameE,
    mobile: data.mobile,
    password: hash,
    token: "",
  });

  const registered = await user.save();
  if (registered) {
    return res
      .status(200)
      .json({ success: true, message: "User Registered", data: data });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Register Failed", data: data });
  }
};

module.exports = {
  userSignup,
};
