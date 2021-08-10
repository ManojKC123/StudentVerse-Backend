const Subject = require('../model/subject');
const asyncHandler = require("../auth/async");
const { body, validationResult } = require('express-validator');


exports.addTopic = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findOne({ _id: req.body.subject });

    const addtopic = await subject.addTopic(req.body.name)
    await subject.save()
        .then((topic) => {
            res.status(200).json({
                success: true,
                message: "Topic added Successfully",
                data: topic
            });
        })
        .catch((err) => {
            res.status(400).json({
                success: true,
                message: "Topic not added"
            });
        })
});

exports.getTopic = asyncHandler(async (req, res, next) => {
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
            message: "No Topics Found",
            error: err
        }));
});
