var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./src/routes/index");
var userRouter = require("./src/routes/user");
var authRouter = require("./src/routes/auth");
var questionRouter = require("./src/routes/question");
var quizRouter = require("./src/routes/quiz");
var alternativeRouter = require("./src/routes/alternative");
var questionAlternativeRouter = require("./src/routes/questionAlternative");
var submissionRouter = require("./src/routes/submission");

var app = express();
var mongodbConnection = require("./src/database/mongodb/mongodb-connection");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/files", express.static(path.resolve(__dirname, "uploads", "images")));
mongodbConnection();

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/question", questionRouter);
app.use("/quiz", quizRouter);
app.use("/alternative", alternativeRouter);
app.use("/question-alternative", questionAlternativeRouter);
app.use("/submission", submissionRouter);
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
