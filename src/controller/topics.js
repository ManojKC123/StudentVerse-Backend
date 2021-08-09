const Subject = require("../model/subject");
const asyncHandler = require("../auth/async");
const { body, validationResult } = require("express-validator");

exports.addTopic = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findOne({ _id: req.body.subject });
  Subject.findOne({
    "topic.name": req.body.name,
  })
    .then((topic) => {
      if (topic) {
        return res.status(200).json({
          success: false,
          message: "Topic already exists",
        });
      }
      console.log(req.file);
      subject
        .addTopic(
          req.body.name,
          req.body.description,
          req.file.filename,
          req.file.id
        )
        .then((topic) => {
          res.status(200).json({
            success: true,
            message: "Topic added Successfully",
            data: topic,
          });
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

exports.getTopic = asyncHandler(async (req, res, next) => {
  const subjectID = req.query.subjectID;
  // await Subject.findById(req.body.subject)

  await Subject.findById(subjectID)
    .then((subjects) => {
      res.status(200).json({
        success: true,
        count: subjects.length,
        data: subjects.topic,
      });
    })
    .catch((err) =>
      res.status(500).json({
        succes: false,
        message: "No Topics Found",
        error: err,
      })
    );
});
