const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkToken = require("../helpers/checkToken");
const checkAdmin = require("../helpers/checkAdmin");
const checkTokenQueryParam = require("../helpers/checkTokenQueryParam");

router.get("/:id", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const targetId = req.params.id;
  try {
    const user = await userController.getUserById(targetId);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "User not found",
    });
  }
});

router.get("/", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
 
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const admin = await checkAdmin.checkAdmin(req, res);
  console.log("admin:"+admin)
  const targetId = req.params.id;
  try {
    const user = await userController.getAllUser(targetId);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "User not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { firstName, lastName, email, password, gender } = req.body;
  try {
    const user = await userController.createUser(
      firstName,
      lastName,
      email,
      password,
      gender
    );
    return res.status(201).json({
      user,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
 
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  
  const targetId = req.params.id;
  if (targetId != req.id) {
    return res.status(404).json({
      msg: "User not authenticated",
    });
  }
  try {
    const password = req.body.password;
    const { firstName, lastName, gender } = req.body;
    const user = await userController.updateUser(
      req.id,
      firstName,
      lastName,
      password,
      gender
    );
    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

module.exports = router;
