const Answer = require('../model/answer');
const Post = require("../model/post");
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const { body, validationResult } = require('express-validator');
const profanity = require('../auth/profanity');
// -----------------FIND Answer BY ID-------------------
exports.loadAnswerById = asyncHandler(async (req, res, next) => {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
        return next(new ErrorResponse("Answer not Found"), 404);
    }
    res.status(200).json({
        success: true,
        data: answer
    });
});

// -----------------Create Answer-------------------//
exports.addAnswer = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        res.status(203).json({ success: false , error: errors })
    }

    else {
        const { id } = req.user;
        const { text } = req.body;
        const cleartext = profanity.censor(text);
        if (req.body.post) {
            const poster = await Post.findById(req.body.post);
            if (poster) {
                if(profanity.exists(text)){
                    poster.censored = true;

                }
                const post = await poster.addAnswer(id, cleartext);
                await post.save();
                res.status(201).json({ success: true, data: post, message: "Answer added Successfully" });
            }
            else {
                res.status(201).json({ success: false, message: "Post already removed" });
            }
        }
        else{
            res.status(201).json({ success: false, message: "Could not post answer" });
        }
    }
};

// -----------------FIND all Answer-------------------
exports.loadAnswer = asyncHandler(async (req, res, next) => {
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
