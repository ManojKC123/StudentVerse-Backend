const mongoose = require("mongoose");
const schema = mongoose.Schema;

const voteSchema = require("./vote");
const commentSchema = require("./comment");

const answerSchema = new schema({
  author: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: { type: Date, default: Date.now },
  text: { type: String },
  comment: [commentSchema],
  votes: [voteSchema],
  score: { type: Number, default: 0 },
});

answerSchema.set("toJSON", { getters: true });

answerSchema.methods = {
  vote: function (user, vote) {
    const existingVote = this.votes.find((v) => {
      if (v.user[0].equals(user)) {
        return v;
      }
      return false;
    });

    if (existingVote) {
      if (vote == -1 && existingVote.vote == 1) {
        this.score += existingVote.vote;
        this.votes.pull(existingVote);
      } else if (vote == 1 && existingVote.vote == -1) {
        this.score += existingVote.vote;
        this.votes.pull(existingVote);
      }
    } else {
      this.score += vote;
      this.votes.push({ user, vote });
    }
  },

  addComment: function (author, text) {
    this.comment.push({ author, text });
    return this;
  },

  removeComment: function (id) {
    const comment = this.comment.id(id);
    if (!comment) throw new Error("Comment Not Found");
    comment.remove();
    return this;
  },
};

module.exports = answerSchema;
