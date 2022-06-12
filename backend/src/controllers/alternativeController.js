const Alternative = require("../models/Alternative");

exports.getAllAlternatives = async () => {
  const alternative = await Alternative.find();
  if (alternative) {
    return alternative;
  }
};

exports.getAlternativeById = async (id) => {
  const alternative = await Alternative.findById(id);
  if (alternative) {
    return alternative;
  }
};

exports.createAlternative = async (alternative) => {
  try {
    alternative.map((alternative) => {
      console.log(alternative);
    });
    const res = Alternative.insertMany(alternative);
    return res;
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    throw errors;
  }
};
