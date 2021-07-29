const express = require("express");
const router = express.Router();

const { guard } = require("../auth/auth");

const {upvote, downvote, unvote} = require("../controller/votes");

router.post('/upvote', guard, upvote);
router.post('/downvote', guard, downvote);
router.post('/unvote', guard, unvote);

module.exports = router;