const express = require("express");
const router = express.Router();
const { addQuiz, loadQuiz, loadchapterQuiz} = require("../controller/quizs");

router.post('/quiz/:chapter',  addQuiz);
router.get('/quiz', loadQuiz );
router.get('/quiz/:chapter', loadchapterQuiz)

module.exports = router;