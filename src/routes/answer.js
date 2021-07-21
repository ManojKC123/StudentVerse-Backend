const express = require("express");
const router = express.Router();

const {
    addAnswer
} = require("../controller/answers");

const {guard} = require("../auth/auth");

router.post("/addAnswer", guard, addAnswer);

module.exports = router;