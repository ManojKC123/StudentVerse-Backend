const mongoose = require('mongoose');
const answerSchema = require('./answer');
const voteSchema = require('./vote');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
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
    tags:[{type: String, required: true}],
    answer:[answerSchema],
    score: {type: Number, default: 0},
    votes: [voteSchema],
    views: {type: Number, default: 0},
    createdAt: {type:Date, default: Date.now},
});

postSchema.set('toJSON', {getters:true});

postSchema.methods = {
    vote: function (user, vote){
        const existingVote = this.votes.find((v)=> v.user._id.equals(user));
        console.log("this is here", user , vote)
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


    addAnswer: function (author, text){
        this.answer.push({author, text});
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