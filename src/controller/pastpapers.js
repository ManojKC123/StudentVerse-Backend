const Pastpaper = require('../model/pastpaper');
const asyncHandler = require("../auth/async");

exports.addPaper = asyncHandler(async(req,res,next)=>{
    if(req.params.chapterid){
        const chapter = req.params.chapterid;
        const {question, year} = req.body;
        const paper = await Pastpaper.create({
            question, year, chapter
        });
        if(paper){
            res.status(200).json({success: true, message: "Past paper added", data: paper})
        }
        else{
            return res.status(500).json({success:false, message: "Paper not added"});
        }
    }
});


exports.loadPaper = asyncHandler(async(req,res, next)=>{
    const paper = await Pastpaper.find({"chapter": req.params.chapterid});
    res.status(200).json({
        success: true,
        count: paper.length,
        data: paper
    })
})