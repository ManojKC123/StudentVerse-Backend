const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    question: {
        type: String
    },
    options: [{type: String}],

    answer: {
      type: Number,
    },
    duration:{
        hours : {
            type : Number,
            default: 0
          },
    
          minutes : {
            type : Number,
            default: 0
          },
    
          seconds : {
            type : Number,
            default: 0
          }
    },
    chapter: {
        type: String,

    }
});

module.exports = mongoose.model('Quiz', quizSchema);