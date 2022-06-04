const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    questionAlternative: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionAlternative",
        required: true,
    },
    correctChoice: {
        type: Boolean,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Submission", submissionSchema);