const Subject = require('../model/subject');
const asyncHandler = require('../auth/async');
const ErrorResponse = require ('../auth/ErrorResponse');
const fs = require("fs");
const {body, validationResult} = require('express-validator');
const upload = require('../auth/image');

// const addSubject = asyncHandler(async(req,res,next)=>{
//     const result = validationResult(req);
//     if(!result.isEmpty()){
//         const errors = result.array({ onlyFirstError:true});
//         return res.status(422).json({errors});
//     }
//     console.log(req.file.buffer);
    
//     const subject = new Subject({
//         name: req.body.name,
//         description: req.body.description
//     });
//     subject.picture.data = req.file.buffer;
//     subject.picture.contentType = req.file.mimetype;
//     subject.save();
//     res.status(201).json({success: true, message: "Subject added Successfully", data: subject});
// });




module.exports = {addSubject, getSubject}