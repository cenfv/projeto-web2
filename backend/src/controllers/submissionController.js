const Submission = require("../models/Submission");
const User = require("../models/User");
const QuestionAlternative = require("../models/QuestionAlternative");
const Alternative = require("../models/Alternative");

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
    const user = await User.findById(userId);
    const questionAlternative = await QuestionAlternative.findById(
      questionAlternativeId
    );
    const choice = await Alternative.findById(choiceId);
    const alternativaCorreta = await Alternative.findById(
      questionAlternative.correctAlternative.toString()
    );

    if (JSON.stringify(choice) === JSON.stringify(alternativaCorreta)) {
      console.log("a");
      submission = new Submission({
        user,
        questionAlternative,
        correctChoice: true,
      });
    } else {
      console.log("b");
      submission = new Submission({
        user,
        questionAlternative,
        correctChoice: false,
      });
    }
    const res = await submission.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
