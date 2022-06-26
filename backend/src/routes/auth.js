const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const checkToken = require("../helpers/checkToken");
const checkTokenQueryParam = require("../helpers/checkTokenQueryParam");

router.get("/", async function (req, res, next) {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  try {
    const user = await userController.getUserById(req.id);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      msg: "Invalid token",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userController.userAuth(email, password);
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      {
        expiresIn: "1 hr",
      }
    );
    return res.status(200).json({
      msg: "user authenticated successfully",
      token: token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "User not authenticated",
    });
  }
});

module.exports = router;
