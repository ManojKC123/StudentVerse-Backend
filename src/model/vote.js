const mongoose = require('mongoose');
const schema = mongoose.schema;

const voteSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        required: true
    },
    vote:{type: Number, required: true}
});


module.exports = mongoose.model('Vote', voteSchema)