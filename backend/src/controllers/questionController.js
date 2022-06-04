const Question = require("../models/Question");

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

exports.createQuestion = async (description, editionYear, difficulty) => {
  try {
    const question = new Question({
      description,
      editionYear,
      difficulty,
    });
    const res = await question.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
