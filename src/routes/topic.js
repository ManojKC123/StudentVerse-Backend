const express = require("express");
const mongoose = require('mongoose');
const topicRouter = express.Router();
const { addTopic, getTopic } = require('../controller/topics');
const { guard } = require("../auth/auth");

topicRouter.route('/topic')
    .post(addTopic)
    .get(getTopic);


module.exports =  topicRouter;

