const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  score: { type: Number },
  time: {type: Number},
  date: { type: Date, default: Date.now},
  quizname: {type: String},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = { Score };