require("../../config/db_connection");
const User = require("../model/user");
const userController = require("../controller/user.controller");
const bcrypt = require("bcryptjs");
const avatar = require("avatar-initials");
const asyncHandler = require("../auth/async")
// const jwt = require("jsonwebtoken");

const userSignup = asyncHandler(async (req, res) => {
  const data = req.body;
  const password = data.password;
 
  // const first_initial = data.fname.substring(0,1);
  // const last_initial = data.lname.substring(0,1);
  // const initials = first_initial + last_initial;
  // console.log(initials);
  // // const initial_png = avatar.initialAvatar({
  // //   initials: initials,
  // //   initial_fg: '#888888',
  // //   initial_bg: '#f4f6f7',
  // //   initial_size: 0, 
  // //   initial_weight: 100,
  // //   initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
  // // });

  const hash = await bcrypt.hash(password, 7);
  const uNameE = data.email.substring(0, data.email.indexOf("@"));
  let user = new User({
    fname: data.fname,
    lname: data.lname,
    email: data.email,
    username: uNameE,
    mobile: data.mobile,
    password: hash,
    // profilepic: initial_png,
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
});

module.exports = {
  userSignup,
};
