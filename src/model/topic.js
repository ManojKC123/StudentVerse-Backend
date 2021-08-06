const mongoose = require('mongoose');
const schema = mongoose.Schema;
const chapterSchema = require('./chapter');

const topicSchema = new schema({
    name: {type: String, required: [true, "Enter a chapter name"]},
    chapter: [chapterSchema],
    pictureName:{
        required: true,
        type: String,
    },
    pictureId: {
        required: true,
        type: String
    }
});

chapterSchema.methods = {
    addChapter: function (name, content){
        this.chapter.push({name, content});
        return this;
    },

    removeChapter: function (id){
        const chapter = this.chapter.id(id);
        if(!chapter) throw new Error('Comment Not Found');
        chapter.remove();
        return this;
    }
}

module.exports = topicSchema;
