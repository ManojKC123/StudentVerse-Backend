const Post = require('../model/post');
const User = require('../model/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const {body, validationResult} = require('express-validator');

// -----------------FIND all Post-------------------
exports.loadPosts = anyncHandler(async(req, res, next) => {
    const post = await Post.find({});
    res.status(201).json({
        success: true,
        count: post.length,
        data: post
    })
});

// -----------------FIND Post BY ID-------------------
exports.loadPostsById = asyncHandler(async (req, res, next) =>{
    const post = await Post.findById(req.params.id);

    if (!post){
        return next(new ErrorResponse("Post not Found"), 404);
    }
    res.status(200).json({
        success: true,
        data: post
    });
});