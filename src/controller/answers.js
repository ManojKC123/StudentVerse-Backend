const Answer = require('../model/answer');
const Post = require("../model/post");
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const { body, validationResult } = require('express-validator');

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
        return res.status(422).json({ errors });
    }

    try {
        const { author } = req.user;
        const { text } = req.body;
        const poster = await Post.findById(req.body.post);
        const post = await poster.addAnswer(author, text);

        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};
