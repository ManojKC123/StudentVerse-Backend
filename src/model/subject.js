const mongoose = require('mongoose');
const chapterSchema = require('./chapter');
const subjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter a subject"]
    },
    description:{
        type: String,
        required: [true, "Please enter a description"]
    },
    chapters:[chapterSchema],
    picture:{
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Subject', subjectSchema);