const User = require("../models/User");

exports.createUser = async (firstName, lastName, email, password, gender) => {
    const user = new User({ firstName, lastName, email, password, gender });
    await user.save();
    console.log(user);
}
