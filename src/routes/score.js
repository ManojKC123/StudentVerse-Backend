const express = require("express");
const router = express.Router();

const {fetchUserScore, addScore, checkScore} = require("../controller/scores");
const { guard } = require("../auth/auth");

router.post('/score', guard, addScore);
router.get('./score/:userId', fetchUserScore);
router.post('/scoreAdd', guard, checkScore);

module.exports = router;