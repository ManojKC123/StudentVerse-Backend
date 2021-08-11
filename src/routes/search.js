const express = require("express");
const router = express.Router();
const {searchPost} = require('../controller/searchs');

router.get('/searchPost', searchPost );

module.exports = router;