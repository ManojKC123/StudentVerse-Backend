const mongoose = require('mongoose');
const topicSchema = require('./topic');

const subjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter a subject"]
    },
    description:{
        type: String,
        required: [true, "Please enter a description"]
    },
    topic:[topicSchema],
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
    addTopic: function(name, description, pictureName, pictureId){
        this.topic.push({name, description, pictureName, pictureId});
        return this.save();
    },

    removeTopic: function(id){
        const topic = this.addTopic.id(id);
        if (!topic) throw new Error ("Chapter not found");
        topic.remove();
        return this.save();
    }
}

module.exports = mongoose.model('Subject', subjectSchema);