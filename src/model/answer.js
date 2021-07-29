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
    console.log("user", user);
    const existingVote = this.votes.find((v) => {
      console.log("vuser", v);
      if (v.user[0].equals(user)) {
        return v;
      }
      return false;
    });
    console.log("existingVote", existingVote);

    if (existingVote) {
      console.log("Youve already voted");
      if (vote == -1) {
        if (existingVote.vote == 1) {
          this.score += existingVote.vote;
          this.votes.pull(existingVote);
        }
        return false;
      } else if (vote == 1) {
        if (existingVote.vote == -1) {
          this.score += existingVote.vote;
          this.votes.pull(existingVote);
        }
        return false;
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
