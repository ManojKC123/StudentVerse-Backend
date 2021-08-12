const Post = require('../model/post');
const User = require('../model/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");


exports.searchPost = asyncHandler(async (req, res, next) => {
    const searchReg = new RegExp(req.query.title, 'im');
    const posts = await Post.find({$or: [{title: searchReg}, {body: searchReg}]})
    if(!posts){
        res.status(500).json({
            succes: false,
            message: "No Posts Found",
        });
    }
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    });
    // Post.find({title: {$regex: searchReg, $options: '$i'}})
    //     .then((data)=>{
    //         res.send(data);
    //     });
});

// User.find({$or:[{region: "NA"},{sector:"Some Sector"}]}

exports.searchTag = asyncHandler(async (req, res, next) => {
    const searchedField = req.query.tags;
    Post.find({tags: {$regex: searchedField, $options: '$i'}})
        .then((data)=>{
            res.send(data);
        });
});

exports.searchUser = asyncHandler(async (req, res, next) => {
    const searchedField = req.query.username;
    User.find({username: {$regex: searchedField, $options: '$i'}})
        .then((data)=>{
            res.send(data);
        });
});