const Post = require('../model/post');
const User = require('../model/user');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");


exports.searchPost = asyncHandler(async (req, res, next) => {
    const searchedField = req.query.question;
    Post.fin({title: {$regex: searchedField, $options: '$i'}})
        .then((data)=>{
            res.send(data);
        });
});