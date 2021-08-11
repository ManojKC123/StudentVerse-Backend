const express = require("express");
const router = express.Router();
const {searchPost} = require('../controller/searchs');
const {searchTag} = require('../controller/searchs');
const {searchUser} = require('../controller/searchs');


router.get('/searchPost', searchPost );
router.get('/searchTag', searchTag );
router.get('/searchUser', searchUser );


module.exports = router;