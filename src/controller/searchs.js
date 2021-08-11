const Post = require('../model/post');
const User = require('../model/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");


exports.searchPost = asyncHandler(async (req, res, next) => {
    const searchedField = req.query.title;
    Post.find({title: {$regex: searchedField, $options: '$i'}})
        .then((data)=>{
            res.send(data);
        });
});

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