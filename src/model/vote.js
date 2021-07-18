const mongoose = require('mongoose');
const schema = mongoose.schema;

const voteSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    vote:{type: Number, required: true}
});


module.exports = mongoose.model('Vote', voteSchema)