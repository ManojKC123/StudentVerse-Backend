const Score  = require("../model/score");
const Quiz = require('../model/quiz');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");

exports.addScore = asyncHandler(async(req, res, next)=>{
    const {score, quizname, time} = req.body;
    const {userId} = req.user;

    let scores = await new Score({
        score,
        time,
        quizname,
        userId
    });
    scores.save()
            .then((score) => {
                res.status(200).json({ success: true,
                     message: "Score added", 
                     data: score })
            })
            .catch(err => res.status(500).json(err));

});


// exports.checkScore = asyncHandler(async(req,res,next)=>{
//     const quizId = req.body.quizid;
//     const quiz = Quiz.findOne({_id: quizId})
//     var score = 0;
//     const option = req.body.option;
//     const answer = quiz.answer;
//     if (option === answer){
//         score = score + 1;
//     }
//     else if (option === answer){
//         score = score -1;
//     }
//     const score = await Score.find({
//         "quizname": 
//     })
//     if (score){
//         Score.updateOne({quizname: })
//     }
// })

exports.fetchUserScore = asyncHandler(async(req, res, next)=>{
    Score.find({userId: req.params.userId}, (err,score) =>{
        res.status(200).json({ success: true, data: score})
    }).sort({ date: -1})
    .catch(err => res.status(500).json(err));
})