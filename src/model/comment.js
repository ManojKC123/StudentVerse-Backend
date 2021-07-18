const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    author: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {type: Date, default: Date.now},
    text:{type: String, required: true}
});

commentSchema.set('toJSON', { getters: true });
commentSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  return obj;
};

module.exports = commentSchema;