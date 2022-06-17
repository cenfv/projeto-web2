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
exports.getSubmissionByUserId = async (userId, page, pageSize) => {
  try {
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    const submission = await Submission.aggregate([
      {
        $match: { user: user._id },
      },
      { $sort: { "data._id": 1 } },

      {
        $lookup: {
          from: "questionalternatives",
          localField: "questionAlternative",
          foreignField: "_id",
          as: "questionAlternative",
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questionAlternative.question",
          foreignField: "_id",
          as: "questionAlternative.question",
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: page } }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
    if (submission) {
      return submission;
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getCorrectSubmissionByUserId = async (userId, page, pageSize) => {
  try {
    const user = await User.findById(userId);
    const submission = await Submission.aggregate([
      {
        $match: { user: user._id, correctChoice: true },
      },
      {
        $group: {
          _id: "$questionAlternative",
          data: { $first: "$$ROOT" },
        },
      },
      { $sort: { "data._id": 1 } },
      {
        $project: {
          _id: "$data._id",
          user: "$data.user",
          questionAlternative: "$data.questionAlternative",
          correctChoice: "$data.correctChoice",
          submissionDate: "$data.submissionDate",
        },
      },
      {
        $lookup: {
          from: "questionalternatives",
          localField: "questionAlternative",
          foreignField: "_id",
          as: "questionAlternative",
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questionAlternative.question",
          foreignField: "_id",
          as: "questionAlternative.question",
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: page } }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
    if (submission) {
      return submission;
    }
  } catch (err) {
    console.log(err);
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

exports.getSubmissionStatistics = async (userId) => {
  try {
    const user = await User.findById(userId);
    const questionsQuantity = await QuestionAlternative.find().count();
    let solvedQuantity = await Submission.aggregate([
      {
        $match: { user: user._id },
      },
      {
        $group: {
          _id: "$questionAlternative",
          data: { $first: "$$ROOT" },
        },
      },
      {
        $count: "total",
      },
    ]);
    const correctQuantity = await Submission.aggregate([
      {
        $match: { user: user._id, correctChoice: true },
      },

      {
        $count: "total",
      },
    ]);
    const submissionQuantity = await Submission.aggregate([
      {
        $match: { user: user._id },
      },
      {
        $count: "total",
      },
    ]);

    let correctSubmissionRate =
      (correctQuantity[0]?.total / submissionQuantity[0]?.total) * 100;

    let progressRate = (solvedQuantity[0]?.total / questionsQuantity) * 100;

    let remainingQuestions = questionsQuantity - solvedQuantity[0]?.total;

    console.log(!progressRate);
    console.log(!correctSubmissionRate);
    console.log(!solvedQuantity);
    console.log(!remainingQuestions);
    if (!progressRate || !correctSubmissionRate || !solvedQuantity[0].total) {
      console.log("vix");
      return {
        progressRate: 0,
        correctSubmissionRate: 0,
        solvedQuantity: 0,
        remainingQuestions: questionsQuantity,
      };
    }
    return {
      progressRate,
      correctSubmissionRate,
      solvedQuantity: solvedQuantity[0]?.total,
      remainingQuestions,
    };
  } catch (err) {
    console.log(err);
  }
};
