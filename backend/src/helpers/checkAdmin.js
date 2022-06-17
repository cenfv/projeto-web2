const User = require("../models/User");
exports.checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.id, "-password");
    if (next && user.role !== 1) {
      return res.status(401).json({
        msg: "The user is not an administrator",
        redirect_url: "/login",
      });
    }
    if (next) {
      next();
    }
    if (user.role === 1) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
