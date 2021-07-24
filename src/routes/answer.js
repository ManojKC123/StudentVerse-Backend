const express = require("express");
const router = express.Router();

const {
    addAnswer, loadAnswer
} = require("../controller/answers");

const {guard} = require("../auth/auth");

router.post("/addAnswer", guard, addAnswer);
router.get("/answers/:id", loadAnswer);

module.exports = router;