const mongoose = require('mongoose');
const schema = mongoose.Schema;

const voteSchema = new schema({
    user: [{
        type: schema.Types.ObjectId,
        required: true
    }],
    vote:{type: Number, required: true}
},
{_id: false}
);


module.exports = voteSchema