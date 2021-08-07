const Subject = require('../model/subject');
const asyncHandler = require("../auth/async");
const { body, validationResult } = require('express-validator');


exports.addChapter = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findOne({ _id: req.body.subject });
    const topic = await subject.topic.id(req.body.topic);
    console.log(topic);
    // const chapter = Subject.findOne({ 'topic.chapter.name': req.body.name });
    // console.log(chapter)
    // if (chapter) {
    //     return res.status(200).json({
    //         success: false,
    //         message: "Chapter already exists"
    //     });
    // }
    const addchapter = await topic.addChapter(req.body.name,
                     req.body.content, req.file.filename,
                     req.file.id);
    
    await subject.save()
    .then((chapter)=>{
        res.status(201).json({success: true, data: addchapter, message: "Chapter added SuccessFully"})
    })
    .catch((err)=>{
        res.status(201).json({success: false, error: err, message: "Chapter Not Added"})
    })
    
    
});

exports.getChapter = asyncHandler(async (req, res, next) => {
    await Subject.findById(req.body.subject)
        .then((subjects) => {
            res.status(200).json({
                success: true,
                count: subjects.length,
                data: subjects.topic
            });
        })
        .catch(err => res.status(500).json({
            succes: false,
            message: "No Chapter Found",
            error: err
        }));
});
