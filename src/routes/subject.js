const express = require("express");
const mongoose = require('mongoose');
const Subject = require('../model/subject');
const subjectRouter = express.Router();
const { guard } = require("../auth/auth");

module.exports = (upload) => {
    const connect = mongoose.createConnection(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    let gfs;
    connect.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: 'uploads'
        });
    });

    /* POST Subject with single image */
    subjectRouter.route('/subject')
        .post(upload.single('picture'), (req, res, next) => {
            Subject.findOne({ name: req.body.name })
                .then((subject) => {
                    if (subject) {
                        return res.status(200).json({
                            success: false,
                            message: "Subject Already exists"
                        });
                    }
                    let newSubject = new Subject({
                        name: req.body.name,
                        description: req.body.description,
                        pictureName: req.file.filename,
                        pictureId: req.file.id
                    });

                    newSubject.save()
                        .then((subject) => {
                            res.status(200).json({
                                success: true,
                                message: "Subject added Successfully",
                                data: subject
                            });
                        })
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
        })
        .get( guard , (req, res, next) => {
            Subject.find({})
                .then(subjects => {
                    res.status(200).json({
                        success: true,
                        data: subjects
                    });
                })
                .catch(err => res.status(500).json(err));
        });


    /* Fetch particular file from upload collection */
    subjectRouter.route('/picture/:pictureName')
        .get((req, res, next) => {
            
            gfs.find({ filename: req.params.pictureName }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: "No files available"
                    })
                }
                res.status(200).json({
                    success: true,
                    file: files[0]
                })
            })
        });


    /* Fetch a file and render in browser */
    subjectRouter.route('/subject/:pictureName')
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


    return subjectRouter;

}

