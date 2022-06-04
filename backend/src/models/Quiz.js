const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Por favor, insira uma descrição"],
  },
  question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
