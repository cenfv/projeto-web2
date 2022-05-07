const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (firstName, lastName, email, password, gender) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    if(password.length < 6){
        return;
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
    });
    const res = await user.save();
    return res;
  } catch (err) {
    console.log(err);
  }
};
exports.updateUser = async (
  id,
  firstName,
  lastName,
  email,
  password,
  gender
) => {
  console.log("entrou update");
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.findById(id);
  console.log(user);
  const res = await user.updateOne({
    firstName,
    lastName,
    email,
    password,
    gender,
  });
  return res;
};
exports.userAuth = async (email, password) => {
  const user = await User.findOne({ email: email });
  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword) {
    return user;
  }
};
exports.getUserById = async (id) => {
  const user = await User.findById(id, "-password");
  if (user) {
    return user;
  }
};
