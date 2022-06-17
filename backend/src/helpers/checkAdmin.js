const User = require("../models/User");
exports.checkAdmin = async (req, res, next) => {
  try {
    console.log("chegou");
    const user = await User.findById(req.id, "-password");
    if (user.role !== 1) {
      return res.status(401).json({
        msg: "The user is not an administrator",
        redirect_url: "/login",
      });
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
