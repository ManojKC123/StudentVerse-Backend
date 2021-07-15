const mongoose = require('mongoose');
const answerSchema = require('./answer');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please enter a title"]
    },
    body:{
        type: String,
        required: [true, "Enter your queries"]
    },
    tags:[{type: string, required: true}],
    answer:[answerSchema],
    createdAt: {type:Date, degault: Date.now},
    author: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
});

module.exports = mongoose.model('Post', postSchema)