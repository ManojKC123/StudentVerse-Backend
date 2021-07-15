const Answer = require('../model/answer');
const User = require('../models/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const {body, validationResult} = require('express-validator');

// -----------------FIND Answer BY ID-------------------
exports.loadAnswerById = asyncHandler(async (req, res, next) =>{
    const answer = await Answer.findById(req.params.id);

    if (!answer){
        return next(new ErrorResponse("Answer not Found"), 404);
    }
    res.status(200).json({
        success: true,
        data: answer
    });
});