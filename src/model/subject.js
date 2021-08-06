const mongoose = require('mongoose');
const chapterSchema = require('./chapter');
const subjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter a subject"]
    },
    description:{
        type: String,
        required: [true, "Please enter a description"]
    },
    chapters:[chapterSchema],
    pictureName:{
        required: true,
        type: String,
    },
    pictureId: {
        required: true,
        type: String
    }

});

subjectSchema.methods = {
    addChapter: function(name){
        this.chapters.push({name});
        return this.save();
    },

    removeChapter: function(id){
        const chapter = this.addChapter.id(id);
        if (!chapter) throw new Error ("Chapter not found");
        chapter.remove();
        return this.save();
    }
}

module.exports = mongoose.model('Subject', subjectSchema);