const mongoose = require('mongoose');
const schema = mongoose.Schema;

const voteSchema = new schema({
    user: [{
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    vote:{type: Number, required: true}
});


module.exports = voteSchema