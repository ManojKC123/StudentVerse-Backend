const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { addComment, loadComment } = require("../controller/comments");

const { guard } = require("../auth/auth");

router.post("/addComment", guard,[
    check('text')
        .trim()
        .exists()
        .withMessage('Comment is required')

        .notEmpty()
        .withMessage('Comment cannot be blank')

        .isLength({ max: 2500 })
        .withMessage('Comment must be at most 2500 characters'),
], addComment);
router.get('/comment/:id', loadComment)

module.exports = router;
