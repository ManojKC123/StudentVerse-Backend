require("../../config/db_connection");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const avatar = require("avatar-initials");
// const jwt = require("jsonwebtoken");

//--------------------------REGISTER USER-----------------
const userSignup = asyncHandler(async (req, res) => {
  const data = req.body;
  const password = data.password;

  const hash = await bcrypt.hash(password, 7);
  const uNameE = data.email.substring(0, data.email.indexOf("@"));
  let user = new User({
    fname: data.fname,
    lname: data.lname,
    email: data.email,
    username: uNameE,
    mobile: data.mobile,
    password: hash,
  });
  user
    .save()
    .then((topic) => {
      res.status(200).json({
        success: true,
        message: "User Registered Successfully!!!",
        data: topic,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});

//--------------------------LOGIN-----------------

const userLogin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Please provide username and password"), 400);
  }

  // Check user
  const user = await User.findOne({ username: username }).select("+password");
  //because in password field we have set the property select:false , but here we need as password so we added + sign

  if (!user) {
    res.status(201).json({
      success: false,
      message: "Invalid credentails user",
    });
  }

  const compare = await user.matchPassword(password);
  if (!compare) {
    res.status(201).json({
      success: false,
      message: "Invalid credentails",
    });
  } else {
    sendTokenResponse(user, 200, res);
  }
});

//--------------------------LOGOUT-----------------
const Logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: "User Logged Out",
  });
});

//--------------------------USER DETAULS-----------------
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  res.status(200).json({
    success: true,
    data: user,
  });
});

const findUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

//--------------------------User Update-----------------
const updateUser = asyncHandler(async (req, res, next) => {
  const userForCheckpass = await User.findOne({ _id: req.user._id }).select(
    "+password"
  );
  const compare = await userForCheckpass.matchPassword(req.body.password);
  if (!compare) {
    return res
      .json({ success: false, message: "Incorrect Current Password" })
      .status(503);
  }
  const user = await User.updateOne(
    { _id: req.user._id },
    {
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      mobile: req.body.mobile,
      address: req.body.address,
    },
    function (err, data) {
      if (err) {
        console.log("update profile error", err);
        return res
          .status(400)
          .json({ message: "User Update Error", success: false });
      } else {
        return res
          .status(200)
          .json({ message: "User Updated Successfully", data, success: true });
      }
    }
  );
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const userForCheckpass = await User.findOne({ _id: req.user._id }).select(
    "+password"
  );
  const compare = await userForCheckpass.matchPassword(req.body.password);
  if (!compare) {
    return res
      .json({ success: false, message: "Incorrect Current Password" })
      .status(503);
  }
  const hash = await bcrypt.hash(req.body.newPassword, 7);
  const user = await User.updateOne(
    { _id: req.user._id },
    {
      password: hash,
    },
    function (err, data) {
      if (err) {
        console.log("update Password error", err);
        return res
          .status(400)
          .json({ message: "User Password Error", success: false });
      } else {
        return res.status(200).json({
          message: "Password Updated Successfully",
          data,
          success: true,
        });
      }
    });
  });
  const updatePicture = asyncHandler(async (req, res, next) => {

    const update = await User.updateOne({ "_id": req.user._id }, { profilename: req.file.filename, profileId: req.file.id })
    if (update) {
      res.status(200).json({ success: true, message: "Profile picture updated" })
    }
    else {
      res.status(500).json({ success: false, message: "Picture not updated" })
    }
  });

  const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
      //Cookie will expire in 30 days
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    // Cookie security is false .if you want https then use this code. do not use in development time
    // if (process.env.NODE_ENV === "proc") {
    //   options.secure = true;
    // }

    //we have created a cookie with a token
    res
      .status(statusCode)
      .cookie("token", token, options) // key , value ,options
      .json({
        success: true,
        token,
        message: "Login Successfull",
        usertype: user.usertype,
      });
  };

  module.exports = {
    userSignup,
    userLogin,
    Logout,
    getUser,
    updateUser,
    updatePassword,
    findUser,
    updatePicture
  }
