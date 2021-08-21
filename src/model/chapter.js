const mongoose = require('mongoose');
const schema = mongoose.Schema;
const quizSchema = require('./quiz');

const chapterSchema = new schema({
    name: {type: String, required: [true, "Enter a chapter name"]},
    content: {type: String},
    pictureName:{
        required: true,
        type: String,
    },
    pictureId: {
        required: true,
        type: String
    },
    score: {type: Number, default: 0}
});


module.exports = chapterSchema;
