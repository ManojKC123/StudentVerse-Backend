const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../model/user.js");
const userController = require("../controller/user.controller.js");
const { guard } = require("../auth/auth");
const { check } = require('express-validator/check');

module.exports = (upload) => {
    const connect = mongoose.createConnection(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    //gfs
    let gfs;
    connect.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: 'uploads'
        });
    });

    //signup
    router.post("/signup", [
        check('fname')
            .trim()
            .exists()
            .withMessage('First Name is required')

            .notEmpty()
            .withMessage('First Name cannot be blank')

            .matches(/^[a-zA-Z_-]+$/)
            .withMessage('Names can only contain alphabets'),

        check('lname')
            .trim()
            .exists()
            .withMessage('Last Name is required')

            .notEmpty()
            .withMessage('Names cannot be blank')

            .matches(/^[a-zA-Z_-]+$/)
            .withMessage('Names can only contain alphabets'),

        check('email')
            .isEmail()
            .withMessage('Please enter a valid Email')
            .custom((value, { req }) => {
                return new Promise((resolve, reject) => {
                    User.findOne({ email: req.body.email }, function (err, user) {
                        if (err) {
                            reject(new Error('Server Error'))
                        }
                        if (Boolean(user)) {
                            reject(new Error('E-mail already in use'))
                        }
                        resolve(true)
                    });
                });
            }),

        check('mobile')
            .trim()
            .exists()
            .withMessage('Password is required')
            .custom((value, { req }) => {
                return new Promise((resolve, reject) => {
                    User.findOne({ mobile: req.body.mobile }, function (err, user) {
                        if (err) {
                            reject(new Error('Server Error'))
                        }
                        if (Boolean(user)) {
                            reject(new Error('Mobile already in use'))
                        }
                        resolve(true)
                    });
                })
            }),

        check('password')
            .trim()
            .exists()
            .withMessage('Password is required')

            .notEmpty()
            .withMessage('Password cannot be blank')

            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/)
            .withMessage('Fulfill password criteria'),


    ], userController.userSignup);

    //login
    router.post("/login", userController.userLogin);

    //Current user Profile
    router.get("/profile", guard, userController.getUser);

    //otherUser
    router.get("/user/:id", userController.findUser);

    //Update Details
    router.put("/profile/update", guard, [
        check('fname')
            .trim()
            .exists()
            .withMessage('First Name is required')

            .notEmpty()
            .withMessage('First Name cannot be blank')

            .matches(/^[a-zA-Z_-]+$/)
            .withMessage('First Name can only contain alphabets'),

        check('lname')
            .trim()
            .exists()
            .withMessage('Last Name is required')

            .notEmpty()
            .withMessage('Last Name cannot be blank')

            .matches(/^[a-zA-Z_-]+$/)
            .withMessage('Last Name can only contain alphabets'),

        check('address')
            .trim()
            .exists()
            .withMessage('Address is required')

            .notEmpty()
            .withMessage('Address cannot be blank')

            .matches(/^[a-zA-Z_-]+$/)
            .withMessage('Address can only contain alphabets'),


    ], userController.updateUser);

    //Update Password
    router.put("/profile/updatePassword", guard, [
        check('newPassword')
            .trim()
            .exists()
            .withMessage('Password is required')

            .notEmpty()
            .withMessage('Password cannot be blank')

            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/)
            .withMessage('6-15 characters, one uppercase, one number and a special character')
    ], userController.updatePassword);

    //Update profile picture
    router.route("/picture/update").put(guard, upload.single('picture'), userController.updatePicture);

    //Logout
    router.get("/logout", userController.Logout);


    //Get User Profile picture
    router.route('/userprofile/:picturename').get((req, res, next) => {
        gfs.find({ filename: req.params.picturename }).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available'
                });
            }

            if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/jpg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                // render image to browser
                gfs.openDownloadStreamByName(req.params.picturename).pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image',
                });
            }
        })
    })


    return router;
}

