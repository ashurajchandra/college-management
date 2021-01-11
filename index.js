const express = require("express");
const port = 8000;

const app = express();
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const passportJWT = require("./config/passport-jwt-strategy");

//middleware
app.use(express.urlencoded());

// handling cors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", require("./routes"));

//firing the server
app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server");
    return;
  }
  console.log("server is up and running on port:", port);
  return;
});
