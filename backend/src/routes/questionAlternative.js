const express = require("express");
const router = express.Router();
const questionAlternativeController = require("../controllers/questionAlternativeController");

router.get("/", async (req, res, next) => {
  try {
    const questionAlternative =
      await questionAlternativeController.getAllQuestionAlternative();
    return res.status(200).json({
      questionAlternative,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Question-Alternative not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const questionAlternativeId = req.params.id;
  try {
    const questionAlternative =
      await questionAlternativeController.getQuestionAlternativeById(
        questionAlternativeId
      );
    return res.status(200).json({
      questionAlternative,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Question-Alternative not found",
    });
  }
});

router.get("/question/:id", async (req, res, next) => {
  const questionId = req.params.id;
  try {
    const questionAlternative =
      await questionAlternativeController.getQuestionAlternativeByQuestionId(
        questionId
      );
    if (questionAlternative.length === 0) {
      return res.status(404).json({
        msg: "Question-Alternative not found",
      });
    }
    return res.status(200).json({
      questionAlternative,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Question-Alternative not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { question, alternative, correctAlternative } = req.body;
  try {
    const questionAlternative =
      await questionAlternativeController.createQuestionAlternative(
        question,
        alternative,
        correctAlternative
      );
    return res.status(201).json({
      questionAlternative,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

module.exports = router;
