const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/", async (req, res, next) => {
  try {
    const questions = await questionController.getAllQuestions();
    return res.status(200).json({
      questions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Question not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const questionId = req.params.id;
  try {
    const question = await questionController.getQuestionById(questionId);
    return res.status(200).json({
      question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Question not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { description, editionYear, difficulty } = req.body;
  try {
    const question = await questionController.createQuestion(
      description,
      editionYear,
      difficulty
    );
    return res.status(201).json({
      question,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

module.exports = router;
