const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  score: { type: Number },
  time: {type: String},
  date: { type: Date, default: Date.now},
  quizname: {type: String},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
