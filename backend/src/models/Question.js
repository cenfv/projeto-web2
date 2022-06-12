const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Por favor, insira uma descrição"],
  },
  editionYear: {
    type: Number,
  },
  difficulty: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
