const Quiz = require('../model/quiz');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");

exports.addQuiz = asyncHandler(async (req, res, next) => {
    if (req.params.chapterid) {
        const chapter = req.params.chapterid;
        const {name, question, options, answer } = req.body;
        const quiz = await Quiz.create({
            name,question,options,answer,chapter
        });
        if (quiz){
            res.status(200).json({ success: true, message: "Quiz added", data: quiz })
        }
        else{
            return res.status(500).json({success:false, message: "Quiz not added"});
        }        

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
    const quiz = await Quiz.find({"chapter": req.params.chapterid});
    
    res.status(200).json({
        success: true,
        count: quiz.length,
        data: quiz
    })
})