const mongoose = require('mongoose');
const answerSchema = require('./answer');
const commentSchema = require('./commentSchema');
const voteSchema = require('./voteSchema');

const postSchema = new mongoose.Schema({
    author: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
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
    comment: [commentSchema],
    score: {type: Number, default: 0},
    votes: [voteSchema],
    views: {type: Number, default: 0},
    createdAt: {type:Date, default: Date.now},
});

questionSchema.methods = {
    vote: function (user, vote){
        const existingVote = this.votes.find((v)=> v.user._id.equals(user));

        if(existingVote){
            this.score -= existing.Vote;
            if (vote == 0 ){
                this.votes.pull(existingVote);
            }
            else{
                this.score += vote;
                this.votes.pull(existingVote);
            }
        }
        else if(vote !== 0){
             this.score += vote;
             this.votes.push({user, vote});   
        }
        return this.save;
    },

    addComment: function (author, body) {
        this.comments.push({author, body});
        return this.save();
    },

    removeComment: function (id) {
        const comment = this.comments.id(id);
        if (!comment) throw new Error ('Comment not found');
        comment.remove();
    },

    addAnswer: function (author, text){
        this.answers.push({author, text});
        return this.save();
    },

    removeAnswer: function (id){
        const answer = this.addAnswer.id(id);
        if (!answer) throw new Error ("Answer not found");
        answer.remove();
        return this.save();
    }
}

module.exports = mongoose.model('Post', postSchema)