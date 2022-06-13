const Question = require("../models/Question");
const quizController = require("../models/Quiz");

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
