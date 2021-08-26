const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../model/user.js");
const userController = require("../controller/user.controller.js");
const { guard } = require("../auth/auth");


module.exports = (upload) => {
const connect = mongoose.createConnection(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

let gfs;
connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'uploads'
    });
});
router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.get("/profile", guard, userController.getUser);
router.get("/user/:id", userController.findUser);
router.put("/user/update", guard, userController.updateUser);
router.put("/profile/update", guard, userController.updateUser);
router.put("/profile/updatePassword", guard, userController.updatePassword);
router.route("/picture/update").put( guard, upload.single('picture'), userController.updatePicture)
router.get("/logout", userController.Logout);


router.route('/userprofile/:picturename').get(guard, (req,res,next)=>{
  gfs.find({ filename: req.params.picturename }).toArray((err, files) =>{
    if (!files[0] || files.length === 0){
        return res.status(200).json({
            success: false,
            message: 'No files available'
        });
    }

    if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
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

