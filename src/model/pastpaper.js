const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pastpaperSchema = new Schema({
    question: [{
        type: String,
    }],
    year: {
        type: String,
    },
    chapter: {
        type: String,

    }
});

module.exports = mongoose.model('Pastpaper', pastpaperSchema);