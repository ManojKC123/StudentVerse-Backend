const Score  = require("../model/score");
const Quiz = require('../model/quiz');
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");

exports.addScore = asyncHandler(async(req, res, next)=>{
    const {score, quizname, time} = req.body;
    const {id} = req.user;
    const userId = id;
    console.log(req.body);
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


exports.checkScore = asyncHandler(async(req,res,next)=>{
    
    const userId = req.user;
    const {quizname, answer, time, option} = req.body;
    
    var score = 0;
    
    
    const Scores = await Score.find({ "quizname": quizname, "userId": userId });
    if (option === answer){
        score = score + 1;
        console.log("it is here 2", score);
    }
    else if (option != answer){
        score = score -1;
    }

    console.log(Scores)
    if (Scores){
        const updatedScore = Score.updateOne({"quizname": quizname, "userId": userId},{score: score, time: time})
        if(updatedScore){
            res.status(200).json({ success: true,
                message: "Score added"})
        }
        else{
            res.status(500).json({ message: "Score not added" })
        }
    }
    else{
        let scores = await new Score({
            score,
            time,
            quizname,
            userId
        });
        scores.save()
                .then((score) => {
                    res.status(200).json({ success: true,
                         message: "Score added" })
                })
                .catch(err => res.status(500).json(err));
    }
})

exports.fetchUserScore = asyncHandler(async(req, res, next)=>{
    Score.find({userId: req.params.userId}, (err,score) =>{
        res.status(200).json({ success: true, data: score})
    }).sort({ date: -1}).limit(10)
    .catch(err => res.status(500).json(err));
})