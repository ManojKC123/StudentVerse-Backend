const Post = require('../model/post');
const User = require('../model/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
const {body, validationResult} = require('express-validator');

// -----------------FIND all Post-------------------
exports.loadPosts = asyncHandler(async(req, res, next) => {
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

// -----------------Create Question-------------------
exports.addPost = asyncHandler(async (req, res, next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array({ onlyFirstError: true});
        return res.status(422).json({errors});
    }
    const {title, tags, body} = req.body;
    const author = req.user.id;
    const post = await Post.create({
        title,
        tags,
        author,
        body
    });
    res.status(201).json({success: true, data: post});
});



// -----------------Delete Question-------------------
exports.removePost = asyncHandler(async (req, res, next)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorResponse('No Post Found'), 404);
    }

    await student.remove();
    res.status(200).json({success: true, count:post.length, data: {},});
});

