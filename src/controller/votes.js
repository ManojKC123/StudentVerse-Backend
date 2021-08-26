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
});


exports.downvote = asyncHandler(async(req,res) => {
    const { id } = req.user;
    const poster = await Post.findById(req.body.post);
    const answer = req.body.answer;
    if (answer){
        const findAns = await poster.answer.id(req.body.answer);
        findAns.vote(id, -1);
        const answerVote = await poster.save();
        return res.json({success: true, message: "Down Voted Answer", data: answerVote})
    }
})

exports.unvote = asyncHandler(async(req,res) => {
    const { id } = req.user;
    const poster = await Post.findById(req.body.post);
    const answer = req.body.answer;
    if(answer){
        const findAns = await poster.answer.id(req.body.answer);
        findAns.vote(id, 0);
        const answerVote = await poster.save();
        return res.json({success: true, message:"Answer Vote Cancelled", data: answerVote});
    }
})


exports.showVote = asyncHandler(async(req,res,next)=>{
    const {id} = req.user;
    const { post, answer} = req.body;
    const poster = await Post.findById(post);
    const findanswer = poster.answer.id(answer);
    const votes = findanswer
    console.log(findanswer)
    return res.json({success: true, data: findanswer})
})