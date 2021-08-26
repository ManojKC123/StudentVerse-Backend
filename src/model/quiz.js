const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: {
      type: String
    },
    question: {
        type: String
    },
    options: [{type: String}],

    answer: {
      type: String,
    },
    chapter: {
        type: String,

    }
});

module.exports = mongoose.model('Quiz', quizSchema);