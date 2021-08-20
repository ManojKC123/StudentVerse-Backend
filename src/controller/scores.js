const Score  = require("../model/score");
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

exports.fetchUserScore = asyncHandler(async(req, res, next)=>{
    Score.find({userId: req.params.userId}, (err,score) =>{
        res.status(200).json({ success: true, data: score})
    }).sort({ date: -1})
    .catch(err => res.status(500).json(err));
})