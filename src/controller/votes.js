const asyncHandler = require("../auth/async");
const Post = require("../model/post");

exports.upvote = asyncHandler(async(req, res) => {
    const { id } = req.user;
    const poster = await Post.findById(req.body.post);
    const answer = req.body.answer;
    if (answer) {
        const findAns = await poster.answer.id(req.body.answer);
        findAns.vote(id, 1);
        
        const answerVote = await poster.save();
        return res.json({success: true, message: "Up Voted Answer", data: answerVote});
    }

    const postVote = await poster.vote(id, 1);
    return res.json({success: true, message: "Up Voted Question", data: postVote}) 

});


exports.downvote = asyncHandler(async(req,res) => {
    const { id } = req.user;
    const poster = await Post.findById(req.body.post);
    const answer = req.body.answer;
    if (answer){
        answer.vote(id, -1);
        const answerVote = await poster.save();
        return res.json({success: true, message: "Down Voted Answer", data: answerVote})
    }

    const postVote = await poster.vote(id, -1);
    return res.json({success: true, message: "Down Voted Question", data: postVote})
})

exports.unvote = asyncHandler(async(req,res) => {
    const { id } = req.user;
    const poster = await Post.findById(req.body.post);
    const answer = req.body.answer;
    if(answer){
        answer.vote(id, 0);
        const answerVote = await poster.save();
        return res.json({success: true, message:"Answer Vote Cancelled", data: answerVote});
    }
    const postVote = await poster.vote(id, 0);
    return res.json({success: true, message:"Quesiton vote Cancelled", data: postVote})
})