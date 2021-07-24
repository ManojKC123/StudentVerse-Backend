const express = require("express");
const router = express.Router();

const { loadPosts, loadPostsById, addPost } = require("../controller/posts");

const { guard } = require("../auth/auth");

router.get("/posts", loadPosts);
router.get("/post/:id", loadPostsById);
router.post("/addQuestion", guard, addPost);

module.exports = router;
