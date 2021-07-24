const express = require("express");
const router = express.Router();

const {
    addComment
} = require("../controller/comments");

const {guard} = require("../auth/auth");

router.post("/addComment", guard, addComment);

module.exports = router;