const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/", async (req, res, next) => {
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
  const { description, questionId } = req.body;
  try {
    const quiz = await quizController.createQuiz(description, questionId);
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
  try {
    const { description, question } = req.body;
    const quiz = await quizController.updateQuiz(
      req.params.id,
      description,
      question
    );
    return res.status(200).json({
      quiz,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

router.post("/:id/question", async (req, res, next) => {
  try {
    const { question } = req.body;
    const quiz = await quizController.addQuestion(req.params.id, question);
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
