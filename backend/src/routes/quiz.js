const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const checkToken = require("../helpers/checkToken");
const checkAdmin = require("../helpers/checkAdmin");
const checkTokenQueryParam = require("../helpers/checkTokenQueryParam");

router.get("/", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  try {
    const quizzes = await quizController.getAllQuizzes();
    return res.status(200).json({
      quizzes,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Quiz not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const quizId = req.params.id;
  try {
    const quiz = await quizController.getQuizById(quizId);
    return res.status(200).json({
      quiz,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Quiz not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const admin = await checkAdmin.checkAdmin(req, res);
  const { description } = req.body;
  try {
    const quiz = await quizController.createQuiz(description);
    return res.status(201).json({
      quiz,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const admin = await checkAdmin.checkAdmin(req, res);
  try {
    const { description } = req.body;
    const quiz = await quizController.updateQuiz(req.params.id, description);
    return res.status(200).json({
      quiz,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

module.exports = router;
