const express = require("express");
const router = express.Router();

const { loadPosts, loadPostsById, addPost, loadUserPost, updatePost, loadOtherPost, removePost } = require("../controller/posts");

const { guard } = require("../auth/auth");

router.get("/posts", loadPosts);
router.get("/post/:id", loadPostsById);
router.post("/addQuestion", guard, addPost);
router.get("/userPost", guard, loadUserPost);
router.put("/post/update", guard, updatePost);
router.get("/otheruser/post", guard, loadOtherPost);
router.delete("/post/:id", guard, removePost);

module.exports = router;
