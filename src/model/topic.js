const mongoose = require('mongoose');
const schema = mongoose.Schema;
const voteSchema = require('./vote');

const topicSchema = new schema({
    name: {type: String, required: [true, "Enter a chapter name"]},
    content: {type: String},
    votes: [voteSchema],
    score: {type: Number, default: 0}
});

topicSchema.methods = {
    vote: function (user,vote){
        const existingVote = this.votes.find((v) => v.user._id.equals(user));

        if (existingVote) {
            this.score -= existingVote.vote;
            if (vote == 0) {
                this.votes.pull(existingVote);
            }
            else {
                this.score += vote;
                existingVote.vote = vote;
            }
        }
        else if (vote !== 0) {
            this.score += vote;
            this.votes.push({ user, vote });
        }
        return this;
    },
}

module.exports = topicSchema;
