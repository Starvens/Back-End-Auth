const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

const web = require("./app/web/routes");
const config = require("./config");

// Connecting to MongoDB
mongoose.connect(config.db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function callback() {
  console.log("Connected to DB");
});

// Cofigure middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Adding Web & Mobile API routes
web(app);

// Error handler, required as of 0.3.0
app.use(function (err, req, res, next) {
  res.status(400).json({
    status: 400,
    success: false,
    message: "Some thing went wrong!",
    error: err,
  });
});

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    message: `App listening on port ${config.port}!`,
  });
});

// 404 Route
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API Not Found!, Please Check API (PATH or METHOD).",
  });
});

// Running App on port based on NODE_ENV
app.listen(config.port, () =>
  console.log(`App listening on port ${config.port}!`)
);
