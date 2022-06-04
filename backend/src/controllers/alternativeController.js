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

exports.createAlternative = async (description) => {
  try {
    const alternative = new Alternative({
      description,
    });
    const res = await alternative.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
