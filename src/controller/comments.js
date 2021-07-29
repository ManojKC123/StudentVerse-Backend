const Answer = require('../model/answer');
const Post = require('../model/post');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const { body, validationResult } = require('express-validator');
const { findById } = require('../model/post');

exports.addComment = async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    }

    try {
        const { id } = req.user;
        const { text } = req.body;

        if (req.body.answer) {
          const post = await Post.findOne({_id: req.body.question});
          const findAns = await post.answer.id(req.body.answer);
          const answer = await findAns.addComment(id, text);
          const poster = await post.save();
          res.status(201).json({success: true, data: answer, message: "Comment Added Successfully"})
        };

    } catch (error) {
        next(error);
    }
};

exports.loadComment = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post){
        return next(new ErrorResponse("Post not Found"), 404);
    }
    res.status(201).json({
        success: true,
        count: post.length,
        data: post.answer
    })
});
