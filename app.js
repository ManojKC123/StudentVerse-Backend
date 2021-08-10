const express = require("express");
require("dotenv/config");
const bodyParser = require("body-parser");
require("./config/db_connection.js");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const upload = require("./src/auth/image");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("welcome to StudentVerse API");
});

// import routes
const userRoutes = require("./src/routes/user");
const postRoutes = require("./src/routes/post");
const answerRoutes = require("./src/routes/answer");
const commentRoutes = require("./src/routes/comment");
const voteRoutes = require("./src/routes/vote");
const subjectRoutes = require("./src/routes/subject");
const topicRoutes = require("./src/routes/topic");
const chapterRoutes = require("./src/routes/chapter");
app.use(userRoutes);
app.use(postRoutes);
app.use(answerRoutes);
app.use(commentRoutes);
app.use(voteRoutes);
app.use(subjectRoutes(upload));
app.use(topicRoutes);
app.use(chapterRoutes(upload));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function (err, done) {
  if (err) {
    console.log("Server launch failed");
    return;
  }
  console.log("Server listening at port", PORT);
});

app.use(function (req, res, next) {
  next({
    msg: "error 404. not found",
    status: 404,
  });
});

// /error handling middleware
// app.use(function (err, req, res, next) {
//   console.log("middleware>>", err);
//   res.status(err.status || 400);
//   res.json({
//     message: err.msg || err,
//   });
// });
