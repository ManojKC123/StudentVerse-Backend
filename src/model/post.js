const mongoose = require('mongoose');
const answerSchema = require('./answer');
const voteSchema = require('./vote');

const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');

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

postSchema.pre('validate', function (next){
    if(this.body){
        this.body = htmlPurify.sanitize(this.body);
    }
    next();
})

postSchema.methods = {
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
             return this.save;
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