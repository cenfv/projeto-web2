const Quiz = require("../models/Quiz");
const questionController = require("../controllers/questionController");

exports.getAllQuizzes = async () => {
  const quiz = await Quiz.find().populate("question");
  if (quiz) {
    return quiz;
  }
};

exports.getQuizById = async (id) => {
  const quiz = await Quiz.findById(id);
  if (quiz) {
    return quiz;
  }
};

exports.createQuiz = async (description, questionId) => {
  try {
    var questions = await Promise.all(
      questionId.map(async (question) => {
        const res = questionController.getQuestionById(question);
        return res;
      })
    );
    const quiz = new Quiz({
      description,
      question: questions,
    });
    const res = await quiz.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.updateQuiz = async (id, description, questionId) => {
  try {
    const quiz = await Quiz.findById(id);
    if (quiz) {
      var questions = await Promise.all(
        questionId.map(async (question) => {
          const res = questionController.getQuestionById(question);
          return res;
        })
      );
      const res = await Quiz.updateOne({
        description,
        question: questions,
      });
      return res;
    }
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.addQuestion = async (id, questionId) => {
  try {
    const quiz = await Quiz.findById(id);
    if (quiz) {
      var questions = await Promise.all(
        questionId.map(async (question) => {
          const res = questionController.getQuestionById(question);
          return res;
        })
      );
      const res = await Quiz.updateOne(
        { _id: id },
        { $push: { question: questions } }
      );
      return res;
    }
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
