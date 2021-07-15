const mongoose = require('mongoose');
const schema = mongoose.schema;

const answerSchema = new schema({
    author: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {type: Date, default: Date.now},
    text:{type: String, required: true}
});


module.exports = mongoose.model('Post', answerSchema)