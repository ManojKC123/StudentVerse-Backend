const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const {
    addAnswer, loadAnswer
} = require("../controller/answers");

const {guard} = require("../auth/auth");

router.post("/addAnswer", guard,[
    check('text')
        .trim()
        .exists()
        .withMessage('Answer is required')

        .notEmpty()
        .withMessage('Answer cannot be blank')

        .isLength({ max: 2500 })
        .withMessage('Answer must be at most 2500 characters'), 
], addAnswer);
router.get("/answers/:id", loadAnswer);

module.exports = router;