const express = require("express");
const router = express.Router();
const { addQuiz, loadQuiz, loadchapterQuiz} = require("../controller/quizs");

router.post('/quiz/:chapterid',  addQuiz);
router.get('/quiz', loadQuiz );
router.get('/quiz/:chapterid', loadchapterQuiz)

module.exports = router;