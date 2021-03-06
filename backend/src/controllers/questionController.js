const Question = require("../models/Question");
const quizController = require("../models/Quiz");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.getAllQuestions = async () => {
  const question = await Question.find();
  if (question) {
    return question;
  }
};

exports.getQuestionById = async (id) => {
  const question = await Question.findById(id);
  if (question) {
    return question;
  }
};
exports.getQuestionByQuizAndDifficulty = async (quizId, difficulty) => {
  const quiz = await quizController.findById(quizId);
  let question;
  if (difficulty) {
    question = await Question.find({
      quiz: quiz._id,
      difficulty: difficulty,
    });
  }
  if (!difficulty) {
    question = await Question.find({
      quiz: quiz._id,
    });
  }
  if (question) {
    return question;
  }
};
exports.createQuestion = async (
  title,
  description,
  editionYear,
  difficulty,
  quizId
) => {
  try {
    const quiz = await quizController.findById(quizId);
    const question = new Question({
      title,
      description,
      editionYear,
      difficulty,
      quiz,
    });
    const res = await question.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.createImage = async (id, imageUrl) => {
  try {
    const res = await Question.updateOne({ _id: id }, { imageUrl });
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getRandomQuestion = async () => {
  try {
    const numItems = await Question.estimatedDocumentCount();
    const rand = Math.floor(Math.random() * numItems);
    const randomItem = await Question.findOne().skip(rand);
    return randomItem;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
