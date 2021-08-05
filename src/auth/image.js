const crypto = require('crypto');
const path = require("path");
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

// create storage engine
const storage = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

module.exports = upload;