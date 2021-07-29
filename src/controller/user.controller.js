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


const findUser = asyncHandler(async(req, res, next) =>{
  try{
    const user = await User.findOne({_id: req.params.id});
    res.status(200).json({
      success: true,
      data: user,
    })
  }
  catch(error){
    next(error);
  }
})

//--------------------------User Update-----------------
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.updateOne(
    { _id: req.user._id },
    {
      email: data.email,
      fname: data.fname,
      lname: data.lname,
      mobile: data.mobile,
      // password: hash,
      address: data.address,
      // imageprof: image,
      // userType: 'user',
    },
    function (err, data) {
      if (err) {
        console.log("update profile error", err);
      } else {
        return res.status(200).json({ message: "Updated Successfully", data });
      }
    }
  );
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
      message: "Login Successfull"
    });
};

module.exports = {
  userSignup,
  userLogin,
  Logout,
  getUser,
  updateUser,
  findUser
};
