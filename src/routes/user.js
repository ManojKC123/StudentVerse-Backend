const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const userController = require("../controller/user.controller.js");

router.get("/", (req, res) => {
  res.send("User routes");
});

// User Signup
router.post("/signup", userController.userSignup);

module.exports = router;
