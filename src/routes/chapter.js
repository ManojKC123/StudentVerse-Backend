const express = require("express");
const mongoose = require('mongoose');
const chapterRouter = express.Router();
const {addChapter, getChapter} = require('../controller/chapters');
const { guard } = require("../auth/auth");

module.exports = (upload) => {
    const connect = mongoose.createConnection(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

    let gfs;
    connect.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: 'uploads'
        });
    });

    chapterRouter.route('/chapter').post(upload.single('picture'), addChapter)
    chapterRouter.route('/chapter/:subject/:topic').get(getChapter);

    chapterRouter.route('/chapter/:pictureName')
        .get((req, res, next) => {
            gfs.find({ filename: req.params.pictureName }).toArray((err, files) =>{
                if (!files[0] || files.length === 0){
                    return res.status(200).json({
                        success: false,
                        message: 'No files available'
                    });
                }

                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml' || files[0].contentType === 'image/webp') {
                    // render image to browser
                    gfs.openDownloadStreamByName(req.params.pictureName).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            })
        })

    return chapterRouter;

}