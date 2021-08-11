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
        .then((chapter) => {
            res.status(201).json({ success: true, data: chapter, message: "Chapter added SuccessFully" })
        })
        .catch((err) => {
            res.status(400).json({ success: false, error: err, message: "Chapter Not Added" })
        })


});

exports.getChapter = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findById(req.body.subject);
    const topic = subject.topic.id(req.body.topic);
    if (!topic) {
        res.status(500).json({
            succes: false,
            message: "No Chapter Found",
        });
    }
    res.status(200).json({
        success: true,
        count: topic.length,
        data: topic.chapter
    });
});
