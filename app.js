const express = require("express");
require("dotenv/config");
const bodyParser = require("body-parser");
require("./config/db_connection.js");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

// app.get("/", (req, res) => {
//   res.send("welcome to StudentVerse API");
// });

// import routes
const userRoutes = require("./src/routes/user");

app.use(userRoutes);

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
app.use(function (err, req, res, next) {
  console.log("middleware>>", err);
  res.status(err.status || 400);
  res.json({
    message: err.msg || err,
  });
});
