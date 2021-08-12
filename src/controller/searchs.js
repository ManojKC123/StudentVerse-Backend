const Post = require('../model/post');
const User = require('../model/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");


exports.searchPost = asyncHandler(async (req, res, next) => {
    const searchReg = new RegExp(req.query.question, 'im');
    const posts = await Post.find({$or: [{title: searchReg}, {body: searchReg}]})
    if(!posts.length){
        res.status(500).json({
            succes: false,
            message: "No data found for " + req.query.question,
        });
    }
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    });
});

// User.find({$or:[{region: "NA"},{sector:"Some Sector"}]}

exports.searchTag = asyncHandler(async (req, res, next) => {
    const searchedField = new RegExp(req.query.tags, 'im');
    const tags = await Post.find({tags: searchedField})
    if(!tags.length){
        res.status(500).json({
            succes: false,
            message: "No data found for " + req.query.tags + " tags",
        });
    }
    res.status(200).json({
        success: true,
        count: tags.length,
        data: tags
    });
});

exports.searchUser = asyncHandler(async (req, res, next) => {
    const searchedField = new RegExp(req.query.username, 'im');
    const user = await User.find({username:searchedField})
    if(!user.length){
        res.status(500).json({
            succes: false,
            message: "No data found for " + req.query.username,
        });
    }
    res.status(200).json({
        success: true,
        count: user.length,
        data: user
    });
});