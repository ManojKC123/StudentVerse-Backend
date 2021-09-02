const Answer = require('../model/answer');
const Post = require('../model/post');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const { validationResult } = require('express-validator');
const profanity = require('../auth/profanity');
exports.addComment = async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        res.status(203).json({ success: false , error: errors })
    }

    else {
        const { id } = req.user;
        const { text } = req.body;
        const cleartext = profanity.censor(text);
        if (req.body.answer && req.body.question) {
            const post = await Post.findOne({ _id: req.body.question });
            const findAns = await post.answer.id(req.body.answer);
            const answer = await findAns.addComment(id, cleartext);
            if (profanity.exists(text)) {
                poster.censored = true;
            }
            const poster = await post.save();
            res.status(201).json({ success: true, data: answer, message: "Comment Added Successfully" })
        }
        else {
            res.status(201).json({ success: false, message: "Could not post comment" });
        }

    }
};

exports.loadComment = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return next(new ErrorResponse("Post not Found"), 404);
    }
    res.status(201).json({
        success: true,
        count: post.length,
        data: post.answer
    })
});
