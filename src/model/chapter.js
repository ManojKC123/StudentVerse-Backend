const mongoose = require('mongoose');
const commentSchema = require('./comment');
const schema = mongoose.Schema;
const topicSchema = require('./topic');

const chapterSchema = new schema({
    name: {type: String, required: [true, "Enter a chapter name"]},
    topic: [topicSchema],
});

chapterSchema.methods = {
    addTopic: function (name, content){
        this.topic.push({author, text});
        return this;
    },

    removeTopic: function (id){
        const topic = this.topic.id(id);
        if(!topic) throw new Error('Comment Not Found');
        commentSchema.remove();
        return this;
    }
}

module.exports = chapterSchema;
