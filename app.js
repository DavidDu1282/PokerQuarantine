var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var keys = require("./config/keys");
var passport = require("passport");
var indexRouter = require("./routes/index");

// connect to mongoDB
require("./models/User");
mongoose.connect(keys.mongoURI);

var app = express();

// passport setup
require("./services/passport");
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
