const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const checkToken = require("../helpers/checkToken");
const checkAdmin = require("../helpers/checkAdmin");

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

router.post(
  "/",
  checkToken.checkTokenBearer,
  checkAdmin.checkAdmin,
  async (req, res, next) => {
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
  }
);

router.put("/:id", async (req, res, next) => {
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
