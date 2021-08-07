const express = require("express");
const mongoose = require('mongoose');
const topicRouter = express.Router();
const {addTopic, getTopic, topicPicture} = require('../controller/topics');
const { guard } = require("../auth/auth");

module.exports = (upload) => {
    const connect = mongoose.createConnection(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    let gfs;
    connect.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: 'uploads'
        });
    });

    topicRouter.route('/topic')
        .post(upload.single('picture'), addTopic)
        .get(getTopic);

    topicRouter.route('/topic/:pictureName')
        .get((req, res, next) => {
            gfs.find({ filename: req.params.pictureName }).toArray((err, files) =>{
                if (!files[0] || files.length === 0){
                    return res.status(200).json({
                        success: false,
                        message: 'No files available'
                    });
                }

                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                    // render image to browser
                    gfs.openDownloadStreamByName(req.params.pictureName).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            })
        })

    return topicRouter;

}