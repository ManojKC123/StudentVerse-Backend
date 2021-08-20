const Quiz = require('../model/quiz');
const Subject = require('../model/subject');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");

exports.addQuiz = asyncHandler(async (req, res, next) => {
    if (req.params.chapter) {
        const chapter = req.params.chapter;
        const {name, question, options, answer } = req.body;
        let quiz = await new Quiz({
            name,
            question,
            options,
            answer,
            chapter
        });
        quiz.save()
            .then((quiz) => {
                res.status(200).json({ success: true, message: "Quiz added", data: quiz })
            })
            .catch(err => res.status(500).json(err));

    }
});

exports.loadQuiz = asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.find();
    res.status(200).json({
        success: true,
        count: quiz.length,
        data: quiz
    })
})

exports.loadchapterQuiz = asyncHandler(async (req, res, next)=>{
    const quiz = await Quiz.find({"chapter": req.params.chapter});
    
    res.status(200).json({
        success: true,
        count: quiz.length,
        data: quiz
    })
})