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
        .withMessage('is required')

        .notEmpty()
        .withMessage('cannot be blank')

        .isLength({ max: 180 })
        .withMessage('must be at most 2500 characters long'), 
], addAnswer);
router.get("/answers/:id", loadAnswer);

module.exports = router;