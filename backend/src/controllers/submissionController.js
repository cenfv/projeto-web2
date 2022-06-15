const Submission = require("../models/Submission");
const User = require("../models/User");
const QuestionAlternative = require("../models/QuestionAlternative");
const Alternative = require("../models/Alternative");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.getAllSubmission = async () => {
  const submission = await Submission.find();
  if (submission) {
    return submission;
  }
};
exports.getSubmissionById = async (id) => {
  const submission = await Submission.findById(id);
  if (submission) {
    return submission;
  }
};
exports.createSubmission = async (userId, questionAlternativeId, choiceId) => {
  try {
    const user = await User.findById(userId, {
      password: 0,
      email: 0,
      firstName: 0,
      lastName: 0,
      gender: 0,
    });
    const questionAlternative = await QuestionAlternative.findById(
      questionAlternativeId
    );

    const choice = await Alternative.findById(choiceId);
    const alternativaCorreta = await Alternative.findById(
      questionAlternative.correctAlternative.toString()
    );

    if (JSON.stringify(choice) === JSON.stringify(alternativaCorreta)) {
      submission = new Submission({
        user,
        questionAlternative,
        correctChoice: true,
      });
    } else {
      submission = new Submission({
        user,
        questionAlternative,
        correctChoice: false,
      });
    }
    const res = await submission.save();
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    throw errors;
  }
};
