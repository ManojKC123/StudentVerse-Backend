const express = require("express");
const router = express.Router();

const {
    loadPosts,
    loadPostsById
} = require("../controller/posts");

const {guard} = require("../auth/auth");

router.get("/posts", guard, loadPosts);
router.get("/post/:id", guard, loadPostsById);