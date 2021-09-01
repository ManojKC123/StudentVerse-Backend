const express = require("express");
const router = express.Router();

const { loadPosts, loadPostsById, addPost, loadUserPost, updatePost, loadOtherPost, removePost } = require("../controller/posts");

const { guard } = require("../auth/auth");
const { check } = require("express-validator");

router.get("/posts", loadPosts);
router.get("/post/:id", loadPostsById);
router.post("/addQuestion", guard, [
    check('title')
        .trim()
        .exists()
        .withMessage('is required')

        .notEmpty()
        .withMessage('cannot be blank')

        .isLength({ max: 180 })
        .withMessage('must be at most 180 characters long'),

    check('body')
        .exists()
        .trim()
        .withMessage('is required')

        .isLength({ min: 10 })
        .withMessage('must be at least 10 characters long')

        .isLength({ max: 5000 })
        .withMessage('must be at most 5000 characters long'),

    check('tags')
        .exists()
        .withMessage('is required')
], addPost);
router.get("/userPost", guard, loadUserPost);
router.put("/post/update", guard, updatePost);
router.get("/otheruser/post/:id", guard, loadOtherPost);
router.delete("/post/:id", guard, removePost);

module.exports = router;
