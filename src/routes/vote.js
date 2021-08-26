const express = require("express");
const router = express.Router();

const { guard } = require("../auth/auth");

const {upvote, downvote, unvote, showVote} = require("../controller/votes");

router.post('/upvote', guard, upvote);
router.post('/downvote', guard, downvote);
router.post('/unvote', guard, unvote);
router.get('/showvote', guard, showVote);

module.exports = router;