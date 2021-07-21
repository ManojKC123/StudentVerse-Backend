const mongoose = require('mongoose');
const schema = mongoose.Schema;

const voteSchema = require('./vote');
const commentSchema = require('./comment');

const answerSchema = new schema({
    author: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {type: Date, default: Date.now},
    text:{type: String},
    comment:[commentSchema],
    votes:[voteSchema],
    score: {type: Number, default: 0}
});

answerSchema.set('toJSON', { getters: true });

answerSchema.methods = {
    vote: function (user, vote) {
        const existingVote = this.votes.find((v)=> v.user._id.equals(user));

        if(existingVote){
            this.score -= exitstingVote.vote;
            if (vote == 0){
                this.votes.pull(existingVote);
            }
            else{
                this.score += vote;
                existingVote.vote = vote;
            }
        }
        else if (vote !== 0){
            this.score += vote;
            this.votes.push({user, vote});
        }
        return this;
    },

addComment: function (author, body){
    this.comment.push({ author, body});
    return this;
},

removeComment: function(id){
    const comment = this.comments.id(id);
    if (!comment) throw new Error('Comment Not Found');
    comment.remove();
    return this;
},
};


module.exports = answerSchema;