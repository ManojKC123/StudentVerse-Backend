const express = require("express");
const router = express.Router();

const { addComment, loadComment } = require("../controller/comments");

const { guard } = require("../auth/auth");

router.post("/addComment", guard, addComment);
router.get('/comment/:id', loadComment)

module.exports = router;
