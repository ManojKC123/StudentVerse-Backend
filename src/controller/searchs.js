const Post = require('../model/post');
const User = require('../model/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");


exports.searchPost = asyncHandler(async (req, res, next) => {
    const searchReg = new RegExp(req.query.question, 'im');
    const posts = await Post.find({$or: [{title: searchReg}, {body: searchReg}]})
    if(!posts.length){
        res.status(500).json({
            success: false,
            message: "No qeustions found for " + req.query.question,
        });
    }
    else{
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    });
    }
});

exports.searchTag = asyncHandler(async (req, res, next) => {
    const searchedField = new RegExp(req.query.tags, 'im');
    const tags = await Post.find({tags: searchedField})
    if(!tags.length){
        res.status(500).json({
            succes: false,
            message: "No data found for " + req.query.tags + " tags",
        });
    }
    else{
    res.status(200).json({
        success: true,
        count: tags.length,
        data: tags
    });
    }  
});

exports.searchUser = asyncHandler(async (req, res, next) => {
    const searchedField = new RegExp(req.query.name, 'im');
    const user = await User.find({$or:[{username: searchedField},{fname:searchedField}, {lname: searchedField}]})
    if(!user.length){
        res.status(500).json({
            succes: false,
            message: "No username found for " + req.query.username,
        });
    }
    else{
    res.status(200).json({
        success: true,
        count: user.length,
        data: user
    });
}
});