const express = require("express");
const router = express.Router();
const { guard } = require("../auth/auth");
const {addPaper, loadPaper} = require('../controller/pastpapers');

router.post('/paper/:chapterid', guard, addPaper);
router.get('/paper/:chapterid', guard, loadPaper);

module.exports = router;