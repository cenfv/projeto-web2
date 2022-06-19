const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const uploadConfig = require("../config/upload");
const multer = require("multer");
const upload = multer(uploadConfig.upload("./uploads/images"));
const checkToken = require("../helpers/checkToken");
const checkAdmin = require("../helpers/checkAdmin");

router.get("/", checkToken.checkTokenBearer, async (req, res, next) => {
  const quiz = req.query.quiz;
  const difficulty = req.query.difficulty;
  try {
    if (quiz || difficulty) {
      const questions = await questionController.getQuestionByQuizAndDifficulty(
        quiz,
        difficulty
      );
      return res.status(200).json({
        questions,
      });
    }
    const questions = await questionController.getAllQuestions();
    return res.status(200).json({
      questions,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Question not found",
    });
  }
});

router.get("/:id", checkToken.checkTokenBearer, async (req, res, next) => {
  const questionId = req.params.id;
  try {
    const question = await questionController.getQuestionById(questionId);
    return res.status(200).json({
      question,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Question not found",
    });
  }
});

router.get(
  "/random/question",
  checkToken.checkTokenBearer,
  async (req, res, next) => {
    try {
      const question = await questionController.getRandomQuestion();
      return res.status(200).json({
        question,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "Question not found",
      });
    }
  }
);

router.post(
  "/",
  checkToken.checkTokenBearer,
  checkAdmin.checkAdmin,
  async (req, res, next) => {
    const { title, description, editionYear, difficulty, quiz } = req.body;
    try {
      const question = await questionController.createQuestion(
        title,
        description,
        editionYear,
        difficulty,
        quiz
      );
      return res.status(201).json({
        question,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

router.patch(
  "/:id/image",
  checkToken.checkTokenBearer,
  checkAdmin.checkAdmin,
  upload.single("img"),
  async (req, res, next) => {
    try {
      const questionId = req.params.id;
      const question = await questionController.getQuestionById(questionId);
      if (!req.file) {
        return res.status(400).json({
          msg: "No file uploaded",
        });
      }
      if (question) {
        const image = await questionController.createImage(
          questionId,
          req.file.filename
        );
        return res.status(200).json({
          image,
        });
      }
      return res.status(500).json({
        msg: "An error occurred while processing the request",
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        msg: "Question not found",
      });
    }
  }
);

module.exports = router;
